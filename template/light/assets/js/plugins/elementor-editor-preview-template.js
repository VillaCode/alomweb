import buttonTemplate from './dsn/template/buttonTemplate';
import lightbox from "./dsn/template/lightbox";
import template from "./dsn/template/template";
import dataAttr from "./dsn/help/dataAttr";


elementor.on("preview:loaded", function () {

    const {queries, dsn_temp_csrf} = dsnTempParam;


    buttonTemplate('dsn-template-button');
    const temp = template();
    const overlay = jQuery("#dsn_temp_overlay");
    const dsn_templates_container = jQuery("#dsn-templates-container");
    const $filtering = temp.find('#dsn_header_template .tabs');
    overlay.hide();
    const box = lightbox({
        message: temp,
        className: "elementor-templates-modal"
    });



    const handleClickFilter = function ($iso) {
        if (!$filtering.length)
            return $iso;

        const handleClick = function () {
            jQuery(this).addClass('dsn-active').siblings().removeClass("dsn-active");
            $iso.isotope({
                filter: jQuery(this).attr("data-dsn-filter"),
            });
        }
        $filtering.find('.tab-item').on("click", handleClick);
        return $iso;
    }

    Fancybox.bind("a.dsn-iframe-ready", {
        type: "iframe" ,
        parentEl : temp.get(0)
    });


    handleClickFilter(dsn_templates_container);

    temp.find('.dsn-icon-temp-close').on('click' , ()=>{
        box.hide();
        overlay.hide();
        temp.removeClass("dsn-ajax-temp");
    })


    const options = {};
    jQuery(elementor.$previewContents[0].body).on("click", ".dsn-template-button", function (event) {
        box.show();
        dsn_templates_container.isotope({
            itemSelector: '.dsn-template-page'
        });

        jQuery(this).parents('.elementor-section-wrap').find('> *').each(($index, $item) => {
            if ($item.classList.contains('elementor-add-section'))
                options.at = $index;
        });

    });


    temp.find('.temp-insert').each(function () {
        const name = dataAttr(this, 'id') + "";
        const id = dataAttr(this, 'name') + "";

        if (!name) return;

        const handleClick = function (e) {

            e.preventDefault();
            jQuery.ajax({
                dataType: "json",
                method: "POST",
                url: queries,
                data: {dsn_temp_csrf, name},
                beforeSend() {
                    overlay.find("h3").text(id);
                    overlay.show();
                    temp.addClass("dsn-ajax-temp");
                },
                success: function (response) {

                    box.hide();
                    overlay.hide();
                    temp.removeClass("dsn-ajax-temp");
                    if (!response.status) {
                        console.log(response);

                        return;
                    }


                    response.data.content.forEach(($item)=>{
                        $e.run("document/elements/create", {
                            container: elementor.getPreviewContainer(),
                            model: $item,
                            options
                        })
                    });



                }
            });
        }

        jQuery(this).on('click', handleClick)
    });


})


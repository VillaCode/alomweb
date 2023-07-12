'use strict';

$wind.on("elementor/frontend/init", function () {

    if (typeof elementor === "undefined")
        return;

    if (typeof elementor.settings !== "object")
        return;

    elementor.once("preview:loaded", loadedElementor);

    function loadedElementor() {


        const options = {
            header: jQuery("#dsn_header"),
            footer: jQuery("#dsn_footer"),
            menu: jQuery("#site_menu_header"),


            settings: elementor.settings ? elementor.settings.page.getSettings().settings : {}
        }


        /**
         *
         * Page Layout
         *
         */


        elementor.settings.page.addChangeCallback("post_featured_image", function (newval) {

            const header_image = jQuery("#hero_image img");
            if (header_image.length) {
                header_image.attr("src", newval.url);
                header_image.removeAttr("srcset");
            } else
                reloadPreview('post_featured_image');


        });

        /**
         * Footer
         */

        if (options.footer.length)
            elementor.settings.page.addChangeCallback("show_footer", function (newval) {

                if (!newval) {
                    options.footer.slideUp();
                    dsnGrid.scrollTop("end");
                    return;
                }
                if (newval && options.footer.length)
                    options.footer.slideDown();
                else
                    reloadPreview('page_footer_section');


                dsnGrid.scrollTop("end");
            });


        function reloadPreview($section, $page, $tab) {
            // elementor.saver.update().then(() => {
            //     updatePreview($section, $page, $tab);
            // });

            elementor.saver.saveEditor({
                status: elementor.settings.page.model.get('post_status'),
                onSuccess: () => {
                    elementor.reloadPreview();
                }

            });


            // elementor.saver.update().then(function (){
            //     updatePreview($section,$page,$tab);
            // });
        }

        /**
         * Reload Preveiw & Open Panel
         */
        function updatePreview($section, $page = "page_settings", $tab = "settings") {


            elementor.reloadPreview();

            setTimeout(() => {


                if ($page) {
                    elementor.getPanelView().setPage($page);
                }

                if ($tab) {
                    elementor.getPanelView().getCurrentPageView().activeTab = $tab;
                }

                if ($section) {
                    elementor.getPanelView().getCurrentPageView().activateSection($section);
                }

                elementor.getPanelView().getCurrentPageView().render();
            }, 100);

            // console.log(elementor.getPanelView().$el.find("#elementor-panel-footer-settings"));

        }

    }
});







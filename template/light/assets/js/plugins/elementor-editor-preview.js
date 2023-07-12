const DSN_CONTROLLER = {
    SWIPER_ARROW: {}
};


elementor.once("preview:loaded", function () {

    elementorFrontend.hooks.addAction("frontend/element_ready/widget", function ($element) {
        const $el = $element.find('.dsn-nav-arrow');
        if (!$el.length) return;

        DSN_CONTROLLER.SWIPER_ARROW[$el.data('dsn-id')] = $el.data('dsn-title');
    });


    const options = {
        header: ['menu_id', 'image_size'],
        footer: ['show_footer', 'type_footer', 'choose_template_footer'],

        layout: ['dsn-container', 'container', 'dsn-right-container', 'dsn-left-container'],
        imageType: ['header-padding', 'left-img', 'right-img', 'dsn-full-header'],
        style: ['v-light', 'v-dark', 'v-light-head', 'v-dark-head'],
        bgTheme: ['background-transparent', 'background-main', 'background-section', 'background-theme'],
        bgBorder: ['dsn-icon-body-color', 'dsn-icon-heading-color', 'dsn-icon-border-color', 'dsn-icon-main-color', 'dsn-icon-assistant-color', 'dsn-icon-theme-color'],
        $header: jQuery("#dsn_header"),
        $footer: jQuery("#dsn_footer"),
        $sidebar: jQuery("#dsn_sidebar"),
        $menu: jQuery("#site_menu_header"),
        defaultTheme: 'v-dark'

    }


    /**
     *
     * --------------------------------------
     *
     *              Handle Element
     *
     * --------------------------------------
     *
     */
    const handleElement = () => {
        options.$header.on('click', function () {
            getSection("page_header_section");
        });

        options.$footer.on('click', function () {
            getSection("page_footer_section");
        });

        options.iframe.find('.next-project').on('click', function () {
            getSection("page_footer_section_animate");
        });
    }

    const initIframe = () => {

        options.settings = elementor.settings ? elementor.settings.page.getSettings().settings : {};
        options.iframe = jQuery('#elementor-preview-iframe');


        if (options.iframe.length) {
            options.iframe = jQuery(options.iframe.get(0).contentWindow.document.body);
            options.defaultTheme = options.iframe.hasClass('v-dark') ? 'v-dark' : 'v-light';

            options.$header = options.iframe.find("#dsn_header");
            options.$footer = options.iframe.find("#dsn_footer");
            options.$sidebar = options.iframe.find("#dsn_sidebar");
            options.$menu = options.iframe.find("#site_menu_header");
            handleElement();
        }
    }

    initIframe();


    /**
     *
     * --------------------------------------
     *
     *              Menu
     *
     * --------------------------------------
     *
     */

    elementor.settings.page.addChangeCallback("show_menu", function (newVal) {
        if (!newVal) {
            options.$menu.slideUp();
            return;
        }
        if (newVal && options.$menu.length)
            options.$menu.slideDown();
        else
            reloadPreview('page_header_section');
    });

    elementor.settings.page.addChangeCallback("show_box_shadow", function (newVal) {
        if (!newVal)
            options.$header.removeClass('show-box-shadow');
        else
            options.$header.addClass('show-box-shadow');

    });

    elementor.settings.page.addChangeCallback("menu_type", function (newVal) {
        options.$menu.removeClass('dsn-hamburger').addClass(newVal);
    });


    /**
     *
     * --------------------------------------
     *
     *              Header BG
     *
     * --------------------------------------
     *
     */


    elementor.settings.page.addChangeCallback("show_header", function (newVal) {

        if (!newVal) {
            options.$header.slideUp();
            return;
        }
        if (newVal && options.header.length)
            options.$header.slideDown();
        else
            reloadPreview('page_header_section');
    });


    elementor.settings.page.addChangeCallback("image_type", function (newVal) {
        options.$header.removeClass(options.imageType).addClass(newVal);
    });


    elementor.settings.page.addChangeCallback("dsn_video_link", function (newVal) {
        options.settings.dsn_video_link = newVal;
        const video = options.$header.find("video");

        if (!video.length) {
            reloadPreview('page_header_section');

        } else {
            video.attr('src', newVal);
        }
    });

    elementor.settings.page.addChangeCallback("opacity_overlay", function (newVal) {
        options.$header.find("#hero_image").attr("data-overlay", newVal.size);
    });

    /**
     *
     * --------------------------------------
     *
     *              Title Area
     *
     * --------------------------------------
     *
     */

    elementor.settings.page.addChangeCallback("text_layout", function (newVal) {
        options.$header.find('#hero_content').removeClass(options.layout).addClass(newVal);
    });

    elementor.settings.page.addChangeCallback("post_title", function (newVal) {
        const {$header, settings} = options,
            hero_content = $header.find("#hero_content .title");

        if (!hero_content.length || settings.custom_title)
            return;
        hero_content.html(newVal);
    });

    elementor.settings.page.addChangeCallback("custom_title", function (newVal) {
        const {$header, settings} = options,
            hero_content = $header.find("#hero_content .title");

        settings.custom_title = newVal;

        if (hero_content.length && newVal)
            hero_content.html(newVal);
        else
            hero_content.html(settings.post_title);
    });


    elementor.settings.page.addChangeCallback("subtitle", function (newVal) {
        const content = options.$header.find('#hero_content .intro-title ');
        const meta = content.find(".subtitle-meta");
        if (meta.length)
            meta.html(newVal);
        else
            content.append("<p class=\"subtitle-meta metas p-relative mt-10\">" + newVal + "</p>");
    });

    elementor.settings.page.addChangeCallback("year_project", function (newVal) {
        const meta = options.$header.find('#dsn_metas .mb-20');
        if (meta.length)
            meta.html(newVal);
        else
            reloadPreview('page_title_section');
    });


    /**
     *
     * --------------------------------------
     *
     *              Page Layout
     *
     * --------------------------------------
     *
     */

    elementor.settings.page.addChangeCallback("page_layout", function (newVal) {
        options.iframe.find('#page_wrapper').removeClass(options.layout).addClass(newVal);
    });


    elementor.settings.page.addChangeCallback("global_background_color", function (newVal) {
        options.iframe.removeClass(options.style).addClass(newVal);
        if (newVal === "auto")
            options.iframe.addClass(options.defaultTheme);
    });


    elementor.settings.page.addChangeCallback('show_sidebar', function (newval) {

        if (!options.$sidebar.length) {
            reloadPreview('page_layout_section');
            return false;
        }

        if (newval === 'show')
            options.$sidebar.show();
        else
            options.$sidebar.hide();


    });


    /**
     *
     * --------------------------------------
     *
     *              Page Footer
     *
     * --------------------------------------
     *
     */

    elementor.settings.page.addChangeCallback("dsn_footer_layout", function (newVal) {
        options.footer.removeClass(options.layout).addClass(newVal);
    });


    elementor.settings.page.addChangeCallback("dsn_footer_bg_ver", function (newVal) {
        options.$footer.removeClass(options.style).addClass(newVal);
    });

    elementor.settings.page.addChangeCallback("dsn_footer_bg", function (newVal) {
        options.$footer.removeClass(options.bgTheme).addClass(newVal);
    });

    elementor.settings.page.addChangeCallback("dsn_footer_bg_ver_svg", function (newVal) {
        options.iframe.find('.footer-animate.svg-animate svg').removeClass(options.style).addClass(newVal);
    });

    elementor.settings.page.addChangeCallback("dsn_footer_bg_svg", function (newVal) {
        options.iframe.find('.footer-animate.svg-animate svg').removeClass(options.bgBorder).addClass(newVal);
    });


    options.header.forEach(function ($item) {
        elementor.settings.page.addChangeCallback($item, function () {
            reloadPreview('page_header_section');
        });
    });

    options.footer.forEach(function ($item) {
        elementor.settings.page.addChangeCallback($item, function () {
            reloadPreview('page_footer_section').then(function () {
                window.scrollTo(0, document.body.scrollHeight);
            });
        });
    });

    elementor.settings.page.addChangeCallback("show_background_video", function (newval) {

        if (newval && !options.settings.dsn_video_link)
            return;

        reloadPreview('page_header_section');
    });

    elementor.settings.page.addChangeCallback("style_text", function () {
        reloadPreview('page_title_section');
    });


    function reloadPreview($section, $page, $tab) {
        return $e.run('document/save/update').then(() => {
            updatePreview($section, $page, $tab)
        });
    }

    /**
     * Reload Preview & Open Panel
     */
    function updatePreview($section, $page = "page_settings", $tab = "settings") {


        elementor.reloadPreview();

        elementor.once('preview:loaded', () => {
            getSection($section, $page, $tab);
            initIframe();
        });
    }

    function getSection($section, $page = "page_settings", $tab = "settings") {
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
    }

});

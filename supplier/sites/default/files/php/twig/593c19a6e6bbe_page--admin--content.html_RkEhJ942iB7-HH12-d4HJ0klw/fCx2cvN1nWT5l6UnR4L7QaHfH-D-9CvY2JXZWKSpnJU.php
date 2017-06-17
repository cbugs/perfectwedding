<?php

/* themes/contrib/agnian_material_admin/templates/pages/page--admin--content.html.twig */
class __TwigTemplate_cce6cd021cda7c267019921bd088958480adde6c8e45d06aa3c31763c35dbe12 extends Twig_Template
{
    public function __construct(Twig_Environment $env)
    {
        parent::__construct($env);

        $this->parent = false;

        $this->blocks = array(
        );
    }

    protected function doDisplay(array $context, array $blocks = array())
    {
        $tags = array("for" => 58, "if" => 80);
        $filters = array("trans" => 56);
        $functions = array();

        try {
            $this->env->getExtension('sandbox')->checkSecurity(
                array('for', 'if'),
                array('trans'),
                array()
            );
        } catch (Twig_Sandbox_SecurityError $e) {
            $e->setTemplateFile($this->getTemplateName());

            if ($e instanceof Twig_Sandbox_SecurityNotAllowedTagError && isset($tags[$e->getTagName()])) {
                $e->setTemplateLine($tags[$e->getTagName()]);
            } elseif ($e instanceof Twig_Sandbox_SecurityNotAllowedFilterError && isset($filters[$e->getFilterName()])) {
                $e->setTemplateLine($filters[$e->getFilterName()]);
            } elseif ($e instanceof Twig_Sandbox_SecurityNotAllowedFunctionError && isset($functions[$e->getFunctionName()])) {
                $e->setTemplateLine($functions[$e->getFunctionName()]);
            }

            throw $e;
        }

        // line 49
        echo "<div id=\"overlay\"></div>
";
        // line 51
        echo "<div id=\"node-types-list-cont\">
  <div class=\"overlay-close-btn\">
\t\t<span class=\"close-btn\"></span>
\t</div>
    <div class=\"holder row\">
      <span class=\"more-btn\" data-text=";
        // line 56
        echo $this->env->getExtension('sandbox')->ensureToStringAllowed($this->env->getExtension('drupal_core')->renderVar(t("Less")));
        echo ">";
        echo $this->env->getExtension('sandbox')->ensureToStringAllowed($this->env->getExtension('drupal_core')->renderVar(t("More")));
        echo " </span>
        <ul class=\"node-types-list\">
            ";
        // line 58
        $context['_parent'] = $context;
        $context['_seq'] = twig_ensure_traversable((isset($context["node_types"]) ? $context["node_types"] : null));
        foreach ($context['_seq'] as $context["type_id"] => $context["type_title"]) {
            // line 59
            echo "                <li class=\"";
            echo $this->env->getExtension('sandbox')->ensureToStringAllowed($this->env->getExtension('drupal_core')->escapeFilter($this->env, ("c-type--" . $context["type_id"]), "html", null, true));
            echo "\">
                    <a href=\"";
            // line 60
            echo $this->env->getExtension('sandbox')->ensureToStringAllowed($this->env->getExtension('drupal_core')->escapeFilter($this->env, ("../node/add/" . $context["type_id"]), "html", null, true));
            echo "\">
                        <span class=\"icon\"></span>
                        <span class=\"title\">";
            // line 62
            echo $this->env->getExtension('sandbox')->ensureToStringAllowed($this->env->getExtension('drupal_core')->escapeFilter($this->env, $context["type_title"], "html", null, true));
            echo "</span>
                    </a>
                </li>
            ";
        }
        $_parent = $context['_parent'];
        unset($context['_seq'], $context['_iterated'], $context['type_id'], $context['type_title'], $context['_parent'], $context['loop']);
        $context = array_intersect_key($context, $_parent) + $_parent;
        // line 66
        echo "        </ul>
    </div>
</div>
";
        // line 70
        echo "
<span id=\"content-add-btn\" data-target=\"node-types-list-cont\"></span>

<div id=\"main-content\" class=\"layout-container\">
    <div class=\"holder row\">
        ";
        // line 75
        echo $this->env->getExtension('sandbox')->ensureToStringAllowed($this->env->getExtension('drupal_core')->escapeFilter($this->env, $this->getAttribute((isset($context["page"]) ? $context["page"] : null), "pre_content", array()), "html", null, true));
        echo "
        ";
        // line 76
        echo $this->env->getExtension('sandbox')->ensureToStringAllowed($this->env->getExtension('drupal_core')->escapeFilter($this->env, $this->getAttribute((isset($context["page"]) ? $context["page"] : null), "breadcrumb", array()), "html", null, true));
        echo "
        <main class=\"page-content clearfix js-quickedit-main-content\" role=\"main\">
            <div class=\"visually-hidden\"><a id=\"main-content\" tabindex=\"-1\"></a></div>
            ";
        // line 79
        echo $this->env->getExtension('sandbox')->ensureToStringAllowed($this->env->getExtension('drupal_core')->escapeFilter($this->env, $this->getAttribute((isset($context["page"]) ? $context["page"] : null), "highlighted", array()), "html", null, true));
        echo "
            ";
        // line 80
        if ($this->getAttribute((isset($context["page"]) ? $context["page"] : null), "help", array())) {
            // line 81
            echo "                <div class=\"help\">
                    ";
            // line 82
            echo $this->env->getExtension('sandbox')->ensureToStringAllowed($this->env->getExtension('drupal_core')->escapeFilter($this->env, $this->getAttribute((isset($context["page"]) ? $context["page"] : null), "help", array()), "html", null, true));
            echo "
                </div>
            ";
        }
        // line 85
        echo "            ";
        echo $this->env->getExtension('sandbox')->ensureToStringAllowed($this->env->getExtension('drupal_core')->escapeFilter($this->env, $this->getAttribute((isset($context["page"]) ? $context["page"] : null), "content", array()), "html", null, true));
        echo "
        </main>
    </div>
</div>";
    }

    public function getTemplateName()
    {
        return "themes/contrib/agnian_material_admin/templates/pages/page--admin--content.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  121 => 85,  115 => 82,  112 => 81,  110 => 80,  106 => 79,  100 => 76,  96 => 75,  89 => 70,  84 => 66,  74 => 62,  69 => 60,  64 => 59,  60 => 58,  53 => 56,  46 => 51,  43 => 49,);
    }

    public function getSource()
    {
        return "{#
/**
 * @file
 * Seven's theme implementation to display a single Drupal page.
 *
 * The doctype, html, head, and body tags are not in this template. Instead
 * they can be found in the html.html.twig template normally located in the
 * core/modules/system directory.
 *
 * Available variables:
 *
 * General utility variables:
 * - base_path: The base URL path of the Drupal installation. Will usually be
 *   \"/\" unless you have installed Drupal in a sub-directory.
 * - is_front: A flag indicating if the current page is the front page.
 * - logged_in: A flag indicating if the user is registered and signed in.
 * - is_admin: A flag indicating if the user has permission to access
 *   administration pages.
 *
 * Site identity:
 * - front_page: The URL of the front page. Use this instead of base_path when
 *   linking to the front page. This includes the language domain or prefix.
 * - logo: The url of the logo image, as defined in theme settings.
 * - site_name: The name of the site. This is empty when displaying the site
 *   name has been disabled in the theme settings.
 * - site_slogan: The slogan of the site. This is empty when displaying the site
 *   slogan has been disabled in theme settings.
 *
 * Page content (in order of occurrence in the default page.html.twig):
 * - node: Fully loaded node, if there is an automatically-loaded node
 *   associated with the page and the node ID is the second argument in the
 *   page's path (e.g. node/12345 and node/12345/revisions, but not
 *   comment/reply/12345).
 *
 * Regions:
 * - page.header: Items for the header region.
 * - page.pre_content: Items for the pre-content region.
 * - page.breadcrumb: Items for the breadcrumb region.
 * - page.highlighted: Items for the highlighted region.
 * - page.help: Dynamic help text, mostly for admin pages.
 * - page.content: The main content of the current page.
 *
 * @see template_preprocess_page()
 * @see seven_preprocess_page()
 * @see html.html.twig
 */
#}
{# black overlay for the page #}
<div id=\"overlay\"></div>
{# rendering node types list #}
<div id=\"node-types-list-cont\">
  <div class=\"overlay-close-btn\">
\t\t<span class=\"close-btn\"></span>
\t</div>
    <div class=\"holder row\">
      <span class=\"more-btn\" data-text={{'Less'|trans }}>{{'More'|trans }} </span>
        <ul class=\"node-types-list\">
            {% for type_id, type_title in node_types %}
                <li class=\"{{ 'c-type--' ~ type_id }}\">
                    <a href=\"{{ '../node/add/' ~ type_id }}\">
                        <span class=\"icon\"></span>
                        <span class=\"title\">{{ type_title }}</span>
                    </a>
                </li>
            {% endfor %}
        </ul>
    </div>
</div>
{# end of rendering node types list #}

<span id=\"content-add-btn\" data-target=\"node-types-list-cont\"></span>

<div id=\"main-content\" class=\"layout-container\">
    <div class=\"holder row\">
        {{ page.pre_content }}
        {{ page.breadcrumb }}
        <main class=\"page-content clearfix js-quickedit-main-content\" role=\"main\">
            <div class=\"visually-hidden\"><a id=\"main-content\" tabindex=\"-1\"></a></div>
            {{ page.highlighted }}
            {% if page.help %}
                <div class=\"help\">
                    {{ page.help }}
                </div>
            {% endif %}
            {{ page.content }}
        </main>
    </div>
</div>";
    }
}

<?php

namespace WeddingBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;

class HomeController extends Controller
{
    public function indexAction()
    {
        return $this->render('WeddingBundle:Home:index.html.twig', array(
            "products" => array("1","2","3","4","5","6")
        ));
    }
  
    public function headerSearchAction()
    {
        return $this->render('WeddingBundle:Home:headerSearch.html.twig');
    }
    
    public function popularCategoriesAction()
    {
        return $this->render('WeddingBundle:Home:popularCategories.html.twig');
    }
    
    public function planningToolsAction()
    {
        return $this->render('WeddingBundle:Home:planningTools.html.twig');
    }
    
    public function featuredWeddingVendorAction()
    {
        $apiData = BaseController::callAPI('GET','/featured_products');
       // $products = json_decode($apiData, true);
        // /var_dump($apiData);exit;

        return $this->render('WeddingBundle:Home:featuredWeddingVendor.html.twig',array(
            "products" => array()
        ));
    }
  
    public function testimonialsAction()
    {
        return $this->render('WeddingBundle:Home:testimonials.html.twig');
    }
    
    public function topWeddingLocationsAction()
    {
        return $this->render('WeddingBundle:Home:topWeddingLocations.html.twig');
    }
    
}
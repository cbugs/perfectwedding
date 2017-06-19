<?php

namespace WeddingBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;
use WeddingBundle\Controller\BaseController;

class HomeController extends BaseController
{
    public function indexAction()
    {
        return $this->render('WeddingBundle:Home:index.html.twig', array(
            "products" => array("1","2","3","4","5","6")
        ));
    }
  
    public function headerSearchAction()
    {
        $apiData = BaseController::callAPI('GET','/location_list');
        $location = json_decode($apiData, true);
        $apiData = BaseController::callAPI('GET','/category_list');
        $category = json_decode($apiData, true);
        return $this->render('WeddingBundle:Home:headerSearch.html.twig', array(
            "category" => $category,
            "location" => $location 
        ));
    }
    
    public function popularCategoriesAction()
    {
        $apiData = BaseController::callAPI('GET','/popular_categories');
        $categories = json_decode($apiData, true);
        return $this->render('WeddingBundle:Home:popularCategories.html.twig',array(
            "categories" => $categories
        ));
    }
    
    public function planningToolsAction()
    {
        return $this->render('WeddingBundle:Home:planningTools.html.twig');
    }
    
    public function featuredWeddingVendorAction()
    {
        $apiData = BaseController::callAPI('GET','/featured_products');
        $products = json_decode($apiData, true);

        $em = $this->getDoctrine()->getManager();
        $userFavourites = $em->getRepository('WeddingBundle:Product\Favourite')->findBy(array('user_id'=>$this->getCurrentUser()->getId()));
        $favouriteProducts = array();
        foreach($userFavourites as $userFavourite) {
            $favouriteProducts[] = $userFavourite->getProductId();
        }
        return $this->render('WeddingBundle:Home:featuredWeddingVendor.html.twig',array(
            "products" => $products,
            "favouriteProducts" => $favouriteProducts
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
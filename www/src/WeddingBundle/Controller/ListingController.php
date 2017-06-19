<?php

namespace WeddingBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use WeddingBundle\Controller\BaseController;

class ListingController extends BaseController
{
  
  public function searchAction(Request $request)
  {
    $url = '/search_product?';
    if( isset($_GET['location']) && !empty($_GET['location'])){
      $url .= 'location_tid='.$_GET['location'].'&';
    }
    if(isset($_GET['category']) && !empty($_GET['category'])){
      $url .= 'category_tid='.$_GET['category'];
    }
    $apiData = BaseController::callAPI('GET',$url);
    $results = json_decode($apiData, true);//var_dump('/search_product?location_tid='.$_GET['location'].'&category_tid='.$_GET['category']);exit;
    
    $favouriteProducts = array();
    if($this->getCurrentUser() != null){
      $em = $this->getDoctrine()->getManager();
      $userFavourites = $em->getRepository('WeddingBundle:Product\Favourite')->findBy(array('active' => 1,'user_id'=>$this->getCurrentUser()->getId()));
      foreach($userFavourites as $userFavourite) {
          $favouriteProducts[] = $userFavourite->getProductId();
      }
    }
    
    return $this->render('WeddingBundle:Listings:search.html.twig', array(
      'category' => 'All',
      'results' => $results,
      'favouriteProducts' => $favouriteProducts
    ));
    
  }
  
  public function detailsAction($id)
  {
    return $this->render('WeddingBundle:Listings:details.html.twig', array(
      'id' => $id
    ));
  }
  
}
<?php

namespace WeddingBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;

class ListingController extends Controller
{
  
  public function searchAction(Request $request)
  {
    $apiData = BaseController::callAPI('GET','/search_product?location_tid='.$_GET['location'].'&category_tid='.$_GET['category']);
    $results = json_decode($apiData, true);var_dump($results);exit;
    return $this->render('WeddingBundle:Listings:search.html.twig', array(
      'category' => 'All',
      'results' => $results
    ));
    
  }
  
  public function detailsAction($id)
  {
    return $this->render('WeddingBundle:Listings:details.html.twig', array(
      'id' => $id
    ));
  }
  
}
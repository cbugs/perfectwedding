<?php

namespace WeddingBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;

class ListingController extends Controller
{
  
  public function searchAction(Request $request)
  {
    $category = $request->request->get('category');
    $location = $request->request->get('location');
    $apiData = BaseController::callAPI('GET','/search?location_tid='.$location.'&category_tid='.$category);
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
<?php

namespace WeddingBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;

class ListingController extends Controller
{
  
  public function searchAction(Request $request)
  {
    $region = $request->request->get('region');
    $location = $request->request->get('location');
    return $this->render('WeddingBundle:Listings:search.html.twig', array(
      'category' => 'All'
    ));
    
  }
  
  public function detailsAction($id)
  {
    return $this->render('WeddingBundle:Listings:details.html.twig', array(
      'id' => $id
    ));
  }
  
}
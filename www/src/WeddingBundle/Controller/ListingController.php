<?php

namespace WeddingBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;

class ListingController extends Controller
{
  
  public function searchAction($category)
  {
    return $this->render('WeddingBundle:Listings:search.html.twig', array(
      'category' => $category
    ));
    
  }
  
  public function detailsAction($id)
  {
    return $this->render('WeddingBundle:Listings:details.html.twig', array(
      'id' => $id
    ));
  }
  
}
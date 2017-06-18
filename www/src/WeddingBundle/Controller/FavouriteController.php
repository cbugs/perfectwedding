<?php

namespace WeddingBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use WeddingBundle\Entity\Product\Favourite;
use WeddingBundle\Controller\BaseController;

class FavouriteController extends BaseController
{
    public function indexAction()
    {
        $em = $this->getDoctrine()->getManager();

        $role = $this->getCurrentUser()->getRoles()->getName();
        if($role == "Couple") {
            $favourites = $em->getRepository('WeddingBundle:Product\Favourite')->findBy(array('user_id'=>$this->getCurrentUser()->getId()));
            $em = $this->getDoctrine()->getEntityManager();
            $couple = $em->getRepository('WeddingBundle:User\Couple')->find($this->getCurrentUser()->getId());
            $cover = $couple->getCoverPicture();
            $profilePicture = $couple->getProfilePicture();
        } else {
            $cover = "";
            $profilePicture = "";            
        }

        return $this->render(
            'WeddingBundle:Dashboard:wishlist.html.twig',
            array(
                'cover' => $cover,
                'profilePicture' => $profilePicture,
                'favourites' => $favourites
                )
        );
    }

    public function saveAction(Request $request)
    {
      $json_response = array();
      if ($request->getMethod() == 'POST' && $this->getCurrentUser()->getId()) {
          $product_id = $request->request->get('product_id'); 
          $em = $this->getDoctrine()->getManager();
          $favourite = $em->getRepository('WeddingBundle:Product\Favourite')->findOneBy(array('product_id'=>$product_id,'user_id'=>$this->getCurrentUser()->getId()));
          if(empty($favourite)){$favourite = new Favourite();$active = 1;}
          else{$active = ($favourite->getActive()==1?0:1);}
          $favourite->setProductId($product_id);
          $favourite->setUser($this->getCurrentUser()->getId());
          $favourite->setActive($active);
          $em->persist($favourite);
          $em->flush();
          $json_response = array("id"=>$favourite->getId());
      }
          $response = new Response(json_encode($json_response));
          $response->headers->set('Content-Type', 'application/json');
          return $response;
    }


}
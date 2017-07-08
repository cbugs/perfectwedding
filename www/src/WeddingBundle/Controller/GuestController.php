<?php

namespace WeddingBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use WeddingBundle\Entity\Couple\Guest;

class GuestController extends BaseController
{

    public function indexAction()
    {

 
            $em = $this->getDoctrine()->getEntityManager();
            $couple = $em->getRepository('WeddingBundle:User\Couple')->find($this->getCurrentUser()->getId());
            $cover = $couple->getCoverPicture();
            $profilePicture = $couple->getProfilePicture();

        return $this->render('WeddingBundle:Dashboard:guestlist.html.twig', array(
            'cover' => $cover,
            'profilePicture' => $profilePicture
        ));

    }
    
    public function getAction()
    {
        $query = $this->getDoctrine()->getManager()
          ->createQuery("SELECT g FROM WeddingBundle:Couple\Guest g WHERE g.user_id = :user_id")
          ->setParameter('user_id', $this->getCurrentUser()->getId());

        $response = new Response(json_encode(array('data'=>$query->getArrayResult())));

        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }

    public function addAction(Request $request)
    {
      $json_response = array();
      if ($request->getMethod() == 'POST' && $this->getCurrentUser()->getId()) {
          $name = $request->request->get('name');
          $contact_number = $request->request->get('contact_number');
          $email = $request->request->get('email');
          $category = $request->request->get('category');
          $child_meal = $request->request->get('child_meal');
          $special_meal = $request->request->get('special_meal');
          $em = $this->getDoctrine()->getManager();
          $guest = new Guest($name, $contact_number, $email, $category, $child_meal, $special_meal, $this->getCurrentUser()->getId());
          $em->persist($guest);
          $em->flush();
          $json_response = array("id"=>$guest->getId());
      }
          $response = new Response(json_encode($json_response));
          $response->headers->set('Content-Type', 'application/json');
          return $response;
    }

    public function saveAction(Request $request)
    {
      $json_response = array();
      if ($request->getMethod() == 'POST' && $this->getCurrentUser()->getId()) {
          $name = $request->request->get('name');
          $contact_number = $request->request->get('contact_number');
          $email = $request->request->get('email');
          $category = $request->request->get('category');
          $child_meal = $request->request->get('child_meal');
          $special_meal = $request->request->get('special_meal');
          
          $em = $this->getDoctrine()->getManager();
          $guest = new Guest($name, $contact_number, $email, $category, $child_meal, $special_meal, $this->getCurrentUser()->getId());
          if(!empty($request->request->get('id'))){
            $guestChk = $em->getRepository('WeddingBundle:Couple\Guest')->findOneBy(array('id'=>$request->request->get('id'),'user_id'=>$this->getCurrentUser()->getId()));
            if(!empty($guestChk)){
                $guest->setId($request->request->get('id'));
            }
          }
          $em->persist($guest);
          $em->flush();
          $json_response = array("id"=>$guest->getId());
      }
          $response = new Response(json_encode($json_response));
          $response->headers->set('Content-Type', 'application/json');
          return $response;
    }


}
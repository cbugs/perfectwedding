<?php

namespace WeddingBundle\Controller;

use WeddingBundle\Controller\BaseController;
use Symfony\Component\HttpFoundation\Response;
use WeddingBundle\Entity\Couple\Budget;
use WeddingBundle\Form\Budget\CreateForm;
use Symfony\Component\HttpFoundation\Request;

class EventController extends BaseController
{
    // public function indexAction()
    // {
    //     $query = $this->getDoctrine()->getManager()
    //       ->createQuery("SELECT b FROM WeddingBundle:Couple\Budget b WHERE b.user_id = :user_id")
    //       ->setParameter('user_id', $this->getCurrentUser()->getId());

    //     $response = new Response(json_encode(array('data'=>$query->getArrayResult())));

    //     $response->headers->set('Content-Type', 'application/json');
    //     return $response;
    // }

    // public function saveAction(Request $request)
    // {
    //   $json_response = array();
    //   if ($request->getMethod() == 'POST' && $this->getCurrentUser()->getId()) {
    //       $id = $request->request->get('id'); 
    //       $em = $this->getDoctrine()->getManager();
    //       $budget = $em->getRepository('WeddingBundle:Couple\Budget')->findOneBy(array('id'=>$id,'user_id'=>$this->getCurrentUser()->getId()));
    //       $budget->setName($request->request->get('name'));
    //       $budget->setEstimatedCost($request->request->get('estimated_cost'));
    //       $budget->setActual($request->request->get('actual'));
    //       $budget->setPaid($request->request->get('paid'));
    //       $budget->setDue($request->request->get('due'));
    //       $em->persist($budget);
    //       $em->flush();
    //       $json_response = array("id"=>$budget->getId());
    //   }
    //       $response = new Response(json_encode($json_response));
    //       $response->headers->set('Content-Type', 'application/json');
    //       return $response;
    // }

    public function createAction(Request $request)
    {

        if ($request->getMethod() == 'POST' && $this->getCurrentUser()->getId()) {
            $em = $this->getDoctrine()->getManager();
            $title = $request->request->get('title'); 
            $userId = $this->getCurrentUser()->getId(); 
            $event = new Event();
            $event->setTitle($title);
            $event->setUserId($userId);
            $em->persist($budget);
            $em->flush();
        }

    }


}
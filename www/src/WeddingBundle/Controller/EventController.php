<?php

namespace WeddingBundle\Controller;

use WeddingBundle\Controller\BaseController;
use Symfony\Component\HttpFoundation\Response;
use WeddingBundle\Entity\Couple\Budget;
use WeddingBundle\Entity\Couple\Event;
use WeddingBundle\Form\Budget\CreateForm;
use Symfony\Component\HttpFoundation\Request;

class EventController extends BaseController
{
    public function indexAction()
    {
        $query = $this->getDoctrine()->getManager()
          ->createQuery("SELECT e FROM WeddingBundle:Couple\Event e WHERE e.userId = :userId")
          ->setParameter('userId', $this->getCurrentUser()->getId());

        $response = new Response(json_encode(array('data'=>$query->getArrayResult())));

        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }

    public function saveAction(Request $request)
    {
      $json_response = array();
      if ($request->getMethod() == 'POST' && $this->getCurrentUser()->getId()) {
          $id = $request->request->get('id'); 
          $em = $this->getDoctrine()->getManager();
          $event = $em->getRepository('WeddingBundle:Couple\Event')->findOneBy(array('id'=>$id,'userId'=>$this->getCurrentUser()->getId()));
          $event->setStartDate($request->request->get('start'));
          $event->setEndDate($request->request->get('end'));
          $em->persist($event);
          $em->flush();
          $json_response = array("id"=>$event->getId());
      }
          $response = new Response(json_encode($json_response));
          $response->headers->set('Content-Type', 'application/json');
          return $response;
    }

    public function createAction(Request $request)
    {
        $data = array();
        if ($request->getMethod() == 'POST' && $this->getCurrentUser()->getId()) {
            $em = $this->getDoctrine()->getManager();
            $title = $request->request->get('title'); 
            $userId = $this->getCurrentUser()->getId(); 
            $event = new Event();
            $event->setTitle($title);
            $event->setUserId($userId);
            $em->persist($event);
            $em->flush();
            $data[]['id'] = $event->getId();
        }

        $response = new Response(json_encode(array('data'=>$data)));

        $response->headers->set('Content-Type', 'application/json');
        return $response;

    }

    public function deleteAction(Request $request)
    {
        $data = array();
        if ($request->getMethod() == 'POST' && $this->getCurrentUser()->getId()) {

            $id = $request->request->get('id'); 
            $query = $this->getDoctrine()->getManager()
            ->createQuery("DELETE FROM WeddingBundle:Couple\Event e WHERE e.userId = :userId and e.id = :id")
            ->setParameter('userId', $this->getCurrentUser()->getId())
            ->setParameter('id', $id);

            $datas = $query->execute();
            $data[]['id'] = $id;
        }
        $response = new Response(json_encode(array('data'=>$data)));

        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }


}
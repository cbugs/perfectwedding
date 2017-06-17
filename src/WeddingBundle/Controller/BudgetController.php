<?php

namespace WeddingBundle\Controller;

use WeddingBundle\Controller\BaseController;
use Symfony\Component\HttpFoundation\Response;
use WeddingBundle\Entity\Couple\Budget;
use WeddingBundle\Form\Budget\CreateForm;
use Symfony\Component\HttpFoundation\Request;

class BudgetController extends BaseController
{
    public function indexAction()
    {
        $query = $this->getDoctrine()->getManager()
          ->createQuery("SELECT b FROM WeddingBundle:Couple\Budget b WHERE b.user_id = :user_id")
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
          $estimated_cost = $request->request->get('estimated_cost');
          $actual = $request->request->get('actual');
          $paid = $request->request->get('paid');
          $due = $request->request->get('due');
          $em = $this->getDoctrine()->getManager();
          $budget = new Budget($name, $estimated_cost, $actual, $paid, $due, $this->getCurrentUser()->getId());
          $em->persist($budget);
          $em->flush();
          $json_response = array("id"=>$budget->getId());
      }
          $response = new Response(json_encode($json_response));
          $response->headers->set('Content-Type', 'application/json');
          return $response;
    }

    public function saveAction(Request $request)
    {
      $json_response = array();
      if ($request->getMethod() == 'POST' && $this->getCurrentUser()->getId()) {
          $id = $request->request->get('id'); 
          $em = $this->getDoctrine()->getManager();
          $budget = $em->getRepository('WeddingBundle:Couple\Budget')->findOneBy(array('id'=>$id,'user_id'=>$this->getCurrentUser()->getId()));
          $budget->setName($request->request->get('name'));
          $budget->setEstimatedCost($request->request->get('estimated_cost'));
          $budget->setActual($request->request->get('actual'));
          $budget->setPaid($request->request->get('paid'));
          $budget->setDue($request->request->get('due'));
          $em->persist($budget);
          $em->flush();
          $json_response = array("id"=>$budget->getId());
      }
          $response = new Response(json_encode($json_response));
          $response->headers->set('Content-Type', 'application/json');
          return $response;
    }

    public function createAction(Request $request)
    {
        $em = $this->getDoctrine()->getManager();

        if ($request->getMethod() == 'POST') {
           // $data = $request->request->get('register_form')['roles'];

        }

        $budget = new Budget();
        //Build the form
        $form = $this->createForm(CreateForm::class, $budget);

        //Handle the submit (will only happen on POST)
        $form->handleRequest($request);
        if ($form->isSubmitted() && $form->isValid()) {

            //Save the User!
            $em->persist($budget);
            $em->flush();

            // ... do any other work - like sending them an email, etc
            // maybe set a "flash" success message for the user

            return $this->redirectToRoute('user_dashboard_budget_create');
        }

        return $this->render(
            'WeddingBundle:Budget:create.html.twig',
            array('form' => $form->createView())
        );
    }


}
<?php

namespace WeddingBundle\Controller;

use WeddingBundle\Controller\BaseController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use WeddingBundle\Entity\Couple\Checklist;

class ChecklistController extends BaseController
{
    public function indexAction()
    {
        $em = $this->getDoctrine()->getManager();
        $chk_arr = array(
            'Engagement' => [],
            'After Engagement' => [],
            '12 to 18 months before wedding' => [],
            '9 months to 11 months before wedding' => [],
            '6 to 8 months before the wedding' => [],
            '4 to 5 months before your wedding' => [],
            '2 to 3 months before wedding' => [],
            '6 to 8 weeks before the wedding' => [],
            '3 to 5 weeks before the wedding' => [],
            '1 to 2 weeks before wedding' => [],
            '1 day before wedding' => [],
            'After the wedding' => [],
        );
        $checklists = $em->getRepository('WeddingBundle:Couple\Checklist')->findBy(array('userId'=>$this->getCurrentUser()->getId()));
        foreach($checklists as $checklist)
        {
            $chk_arr[$checklist->getDate()][] = $checklist;
        }

        $role = $this->getCurrentUser()->getRoles()->getName();
        if($role == "Couple") {
            $em = $this->getDoctrine()->getEntityManager();
            $couple = $em->getRepository('WeddingBundle:User\Couple')->find($this->getCurrentUser()->getId());
            $cover = $couple->getCoverPicture();
            $profilePicture = $couple->getProfilePicture();
        } else {
            $cover = "";
            $profilePicture = "";            
        }

        return $this->render(
            'WeddingBundle:Dashboard:checklist.html.twig',
            array(
                'checklists'=>$chk_arr,
                'cover' => $cover,
                'profilePicture' => $profilePicture
                )
        );
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

    public function saveDoneAction(Request $request)
    {
      $json_response = array();
      if ($request->getMethod() == 'POST' && $this->getCurrentUser()->getId()) {
          $em = $this->getDoctrine()->getManager();
          $id = $request->request->get('id'); 
          $value = $request->request->get('value');
          $checklist = $em->getRepository('WeddingBundle:Couple\Checklist')->findOneBy(array('id'=>$id,'userId'=>$this->getCurrentUser()->getId()));          
          $checklist->setDone($value);
          $em->persist($checklist);
          $em->flush();
          $json_response = array("id"=>$checklist->getId());
      }
          $response = new Response(json_encode($json_response));
          $response->headers->set('Content-Type', 'application/json');
          return $response;        
    }

    public function saveAction(Request $request)
    {
      $json_response = array();
      if ($request->getMethod() == 'POST' && $this->getCurrentUser()->getId()) {
          $em = $this->getDoctrine()->getManager();
          if(!empty($request->request->get('checklist-id'))){
            $new = 0;
            $id = $request->request->get('checklist-id'); 
            $checklist = $em->getRepository('WeddingBundle:Couple\Checklist')->findOneBy(array('id'=>$id,'userId'=>$this->getCurrentUser()->getId()));
          } else {
            $new = 1;
            $checklist = new Checklist();
            $checklist->setUserId($this->getCurrentUser()->getId());
          }
          
          $checklist->setTitle($request->request->get('checklist-name'));
          $checklist->setDescription($request->request->get('checklist-description'));
          $checklist->setDate($request->request->get('checklist-date'));
          $checklist->setCategory($request->request->get('checklist-category'));
          $em->persist($checklist);
          $em->flush();
          $json_response = array("new"=>$new,"id"=>$checklist->getId(),"title"=>$checklist->getTitle(),"date"=>$checklist->getDate(),"description"=>$checklist->getDescription(),"category"=>$checklist->getCategory());
      }
          $response = new Response(json_encode($json_response));
          $response->headers->set('Content-Type', 'application/json');
          return $response;
    }

}
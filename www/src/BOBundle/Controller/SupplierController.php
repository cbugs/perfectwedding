<?php

namespace BOBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use WeddingBundle\Controller\BaseController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class SupplierController extends BaseController
{
    public function indexAction(Request $request)
    {
        $em = $this->getDoctrine()->getManager();
       
        if(!$this->getCurrentUser()){throw new NotFoundHttpException('Sorry not found!');}
        $id = $this->getCurrentUser()->getId();
        $user = $em->getRepository('WeddingBundle:User\Supplier')->find($id);
        return $this->render('BOBundle:Supplier:index.html.twig',array(
            'name' => $user->getUsername(),
            'address' => $user->getAddress(),
            'contact' => $user->getContact(),
            'opening_hours' => $user->getOpening_hours(),
        ));
    }

    public function productsAction($id)
    {
        return $this->render('BOBundle:Supplier:products.html.twig');
    }

    public function saveAction(Request $request)
    {
        if ($request->getMethod() == 'POST') {
$em = $this->getDoctrine()->getManager();
           // $currentUser = $this->getCurrentUser();
        //if($currentUser == null){return $this->redirectToRoute('user_login');}
       // $id = $currentUser->getId();
       $id =21;
       $user = $em->getRepository('WeddingBundle:User\Supplier')->find($id);
       $address = $request->request->get('address'); 
       $contact = $request->request->get('contact'); 
       $opening_hours = $request->request->get('opening_hours'); 
            $user->setAddress($address);
            $user->setContact($contact);
            $user->setOpening_hours($opening_hours);
            $em->persist($user);
            $em->flush();
        }

        return $this->redirectToRoute('admin');
    }

}

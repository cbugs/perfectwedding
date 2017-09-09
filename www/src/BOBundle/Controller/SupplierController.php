<?php

namespace BOBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use WeddingBundle\Controller\BaseController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class SupplierController extends BaseController
{
    public function indexAction($id)
    {
        $em = $this->getDoctrine()->getManager();
        $id =21;
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

        return $this->redirectToRoute($this->generateUrl('admin',array('id'=>$id)));
    }

}

<?php

namespace WeddingBundle\Controller;

use WeddingBundle\Controller\BaseController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;

class DashboardController extends BaseController
{
    public function indexAction(Request $request)
    {
        $currentUser = $this->getCurrentUser();
        if($currentUser == null){return $this->redirectToRoute('user_login');}

        $em = $this->getDoctrine()->getEntityManager();
        $couple = $em->getRepository('WeddingBundle:User\Couple')->find($this->getCurrentUser()->getId());
        $cover = $couple->getCoverPicture();
        $profilePicture = $couple->getProfilePicture();

        return $this->render('WeddingBundle:Dashboard:index.html.twig', array(
            'cover' => $cover,
            'profilePicture' => $profilePicture
        ));
    }

    public function budgetAction()
    {
        $currentUser = $this->getCurrentUser();
        if($currentUser == null){return $this->redirectToRoute('user_login');}

        $em = $this->getDoctrine()->getEntityManager();
        $couple = $em->getRepository('WeddingBundle:User\Couple')->find($this->getCurrentUser()->getId());
        $cover = $couple->getCoverPicture();
        $profilePicture = $couple->getProfilePicture();

        return $this->render('WeddingBundle:Dashboard:budget.html.twig', array(
            'cover' => $cover,
            'profilePicture' => $profilePicture
        ));

    }
}
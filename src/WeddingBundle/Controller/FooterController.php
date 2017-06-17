<?php

namespace WeddingBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;

class FooterController extends Controller
{
    public function indexAction()
    {
        return $this->render('WeddingBundle:Regions:footer.html.twig', array(
        ));
    }
}
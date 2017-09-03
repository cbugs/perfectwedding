<?php

namespace BOBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

class SupplierController extends Controller
{
    public function indexAction($id)
    {
        return $this->render('BOBundle:Supplier:index.html.twig');
    }
}

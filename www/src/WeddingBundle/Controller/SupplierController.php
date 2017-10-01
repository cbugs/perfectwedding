<?php
// src/WeddingBundle/Controller/RegisterController.php
namespace WeddingBundle\Controller;

use WeddingBundle\Form\User\RegisterForm;
use WeddingBundle\Form\User\CoupleForm;
use WeddingBundle\Form\User\SupplierForm;
use WeddingBundle\Entity\User\User;
use WeddingBundle\Entity\User\Couple;
use WeddingBundle\Entity\User\Confirmation;
use WeddingBundle\Entity\User\Supplier;
use WeddingBundle\Entity\SecurityToken;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use WeddingBundle\Controller\BaseController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Core\Authentication\Token\UsernamePasswordToken;
use Symfony\Component\HttpFoundation\Cookie;

class SupplierController extends BaseController
{

    public function indexAction($id)
    {
      
        $apiData = BaseController::callAPI('GET','/get_product_uid?nid='.$id);
        $supplier_uid = json_decode($apiData, true);
        var_dump($supplier_uid);
        $apiData = BaseController::callAPI('GET','/get_supplier?uid=21');
        $supplier_details = json_decode($apiData, true);
      var_dump($supplier_details);
        $apiData = BaseController::callAPI('GET','/get_supplier_products?uid=21');
        $supplier_products = json_decode($apiData, true);
      var_dump($supplier_products);exit;
        return $this->render('WeddingBundle:Home:headerSearch.html.twig', array(
            "category" => $category,
            "location" => $location 
      
        return $this->render(
            'WeddingBundle:Supplier:index.html.twig'
            ,array('id' => $id)
        );
    }

}

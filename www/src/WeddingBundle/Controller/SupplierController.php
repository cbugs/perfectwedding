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
        $supplier_uid = $supplier_uid[0]['uid'][0]['target_id'];

        $apiData = BaseController::callAPI('GET','/get_supplier?uid='.$supplier_uid);
        $supplier_details = json_decode($apiData, true);

        $apiData = BaseController::callAPI('GET','/get_supplier_products?uid='.$supplier_uid);
        $supplier_products = json_decode($apiData, true);
        
        $s_products = array();
      
        foreach($supplier_products as $supplier_product)
        {
         $s_products[] = array(
          'image' => isset($supplier_product['field_product_image'][0]['url'])?$supplier_product['field_product_image'][0]['url']:'',
          'title' => $supplier_product['title'][0]['value'],
          'price' => isset($supplier_product['field_product_price'][0]['value'])?$supplier_product['field_product_price'][0]['value']:''
         );
        }
      
        $return = array (
          's_address' => $supplier_details[0]['field_a']['value'],
          's_name' => isset($supplier_details[0]['field_company_name'][0])?$supplier_details[0]['field_company_name'][0]['value']:'',
          's_email' => $supplier_details[0]['mail'][0]['value'],
          's_image' => isset($supplier_details[0]['user_picture'][0])?$supplier_details[0]['user_picture'][0]['value']:'',
          's_products' => $s_products
        );
      
      var_dump($return);

        return $this->render(
            'WeddingBundle:Supplier:index.html.twig'
            ,$return
        );
    }

}

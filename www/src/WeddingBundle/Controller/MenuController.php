<?php

namespace WeddingBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;
use WeddingBundle\Controller\BaseController;

class MenuController extends BaseController
{
    public function mainAction()
    {

        $menuList = array(
            'home' => array(
                'home' => '/home',
                'homev2' => '/homev2',
            ),
            'listing' => array(
                'list / half map' => '/halfmap',
                'list / sidebar' => '/sidebar',
                'list / no sidebar' => '/nosidebar',
            ),
            'vendor' => array(
                'vendor simple' => '/vsimple',
                'vendor tabbed' => '/vtabbed',
                'vendor profile' => '/vprofile',
            ),
            'suppliers' => array(
                'venue list' => '/vlist',
            ),
            'planning tools' => array(
                'to do list' => '/tlist',
            ),
            'features' => array(
                'blog' => '/blog',
            ),
            'real weddings' => array(
                'listing' => '/listing',
            ),
        );
        $currentUser = $this->getCurrentUser();
        if($currentUser == null){$loggedIn = 0;}else{$loggedIn = 1;var_dump($this->getCurrentRole());}
        return $this->render('WeddingBundle:Menu:main.html.twig', array(
            'menuList' => $menuList, 'loggedIn' => $loggedIn
        ));
    }
}
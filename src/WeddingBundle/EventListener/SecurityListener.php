<?php

// src/AppBundle/EventListener/ExceptionListener.php
namespace WeddingBundle\EventListener;

use Symfony\Component\HttpKernel\Event\GetResponseEvent;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\HttpExceptionInterface;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\HttpKernel\Event\FilterControllerEvent;
use WeddingBundle\Controller\UserController;
use Doctrine\ORM\EntityManager;

class SecurityListener
{

    protected $em;
    private $user;

    function __construct(EntityManager $em)
    {
        $this->em = $em;
    }

    public function onKernelRequest(GetResponseEvent $event)
    {
        $request = $event->getRequest();

        $session = $request->getSession();
        if($session->get("SESSID")){
            $token = $this->em->getRepository('WeddingBundle:SecurityToken')->findOneBy(array('token'=>$session->get("SESSID")));
            $user = $this->em->getRepository('WeddingBundle:User\User')->find($token->getUserId());
            $this->user = $user;
        }

        // var_dump($event);exit;
        // $request = $event->getRequest();

        // $session = $request->getSession();

        // // Matched route
        // $_route  = $request->attributes->get('_route');

        // // Matched controller
        // $_controller = $request->attributes->get('_controller');

        // // All route parameters including the `_controller`
        // $params      = $request->attributes->get('_route_params');
    }

    public function getUser()
    {
        return $this->user;
    }

}
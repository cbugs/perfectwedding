<?php
namespace WeddingBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;

class BaseController extends Controller
{
    protected $user;

    public function getCurrentUser()
    {
        if ($this->user === null) {
            $this->user = $this->get('app.security_listener')->getUser();
        }
        return $this->user;
    }
}
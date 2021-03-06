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

class UserController extends BaseController
{

    public function registerAction(Request $request)
    {
        $currentUser = $this->getCurrentUser();
        if($currentUser != null){return $this->redirectToRoute('wedding_homepage');}
        $em = $this->getDoctrine()->getManager();
        $user = null;
        if ($request->getMethod() == 'POST') {
            $role = $request->request->get('role');
            if($role=="supplier"){$user = new Supplier();}
            if($role=="couple"){$user = new Couple();}
        }

        $form = $this->createForm(RegisterForm::class, ($user==null?new User():$user), array("roles" => self::getRolesList()));
        if($role=="supplier"){$form = $this->createForm(RegisterForm::class, ($user==null?new Supplier():$user), array("roles" => self::getRolesList()));}
        if($role=="couple"){$form = $this->createForm(RegisterForm::class, ($user==null?new Couple():$user), array("roles" => self::getRolesList()));}
        
        //Build the form
//$form = $this->createForm(RegisterForm::class, ($user==null?new Supplier():$user), array("roles" => self::getRolesList()));
        //Handle the submit (will only happen on POST)
        $form->handleRequest($request);
        if ($form->isSubmitted()) {
   
            //Encode the password (you could also do this via Doctrine listener)
            $password = $this->get('security.password_encoder')
                ->encodePassword($user, $user->getPlainPassword());
            $user->setPassword($password);
            if($role=="couple"){
            $user->setName($user->getUsername());
            }
            $user->setUsername($user->getEmail());

            //Save the User!
            $em->persist($user);
            $em->flush();

            // ... do any other work - like sending them an email, etc
            // maybe set a "flash" success message for the user

            $confirmation = new Confirmation($user->getId());
            $em->persist($confirmation);
            $em->flush();    
            if($role=="couple"){
                $n = $user->getName();
            }else{
                $n = 'Wedding Supplier';
            }        
            
            self::sendRegistrationEmail($n,$user->getEmail(),$confirmation->getValue());

            return $this->redirectToRoute('user_login',array("register"=>"success"));
        }

        return $this->render(
            'WeddingBundle:User:login.html.twig'
            //,array('form' => $form->createView())
        );
    }


    public function confirmationAction($hash)
    {
        $em = $this->getDoctrine()->getManager();

        $query = $this->getDoctrine()->getManager()
          ->createQuery("SELECT c FROM WeddingBundle:User\Confirmation c WHERE c.value = :hash")
          ->setParameter('hash', $hash);

        $result  = $query->getArrayResult();

        if(!empty($result))
        {
            foreach($result as $r)
            {
                $user = $em->getRepository('WeddingBundle:User\User')->findOneBy(array('id'=>$r["userId"]));
                $user->setActive(1);
                $em->persist($user);
                $em->flush();
            }
        }

        return $this->redirectToRoute('user_login',array("confirmation"=>"success"));
    }

    public function sendRegistrationEmail($name, $email, $confirmation)
    {
        # Setup the message
        $message = \Swift_Message::newInstance()
            ->setSubject('Perfect Wedding - Registration')
            ->setFrom('info@4dcubes.com')
            ->setTo($email)
            ->setBody($this->renderView(
                            // app/Resources/views/Emails/registration.html.twig
                            'WeddingBundle:Emails:registration.html.twig',
                            array('name' => $name, 'confirmation'=>$confirmation)
                        ), 'text/html');
       $this->get('mailer')->send($message);
    }


    /**
     * @Route("/login", name="user_login")
     */
    public function loginAction(Request $request)
    {
        $currentUser = $this->getCurrentUser();
        if($currentUser != null){return $this->redirectToRoute('wedding_homepage');}
        $error = "";
        //var_dump($request->getSession()->get('SESSID'));exit;
        $response = new Response();
        if ($request->getMethod() == 'POST') {
            $username = $request->request->get('username');
            $password = $request->request->get('password');
            $em = $this->getDoctrine()->getManager();
            $user = $em->getRepository('WeddingBundle:User\User')->findOneBy(array('username'=>$username));
            if(!$user){
              $user = $em->getRepository('WeddingBundle:User\User')->findOneBy(array('email'=>$username));  
            }
            if($user){
                if(!$user->getActive())
                {
                    return $this->render('WeddingBundle:User:login.html.twig', array(
                        'inactive' => 1,
                        'error'         => 0,
                        'success'   => 0,
                        'confirmation' => 0,
                        $response
                    ));
                }
                if($this->get('security.password_encoder')->isPasswordValid($user, $password)){
                            $session = $request->getSession();

                            // the firewall context (defaults to the firewall name)
                            $firewall = 'secured_area';

                            $token = bin2hex(random_bytes(16));
 
                            $session->set('SESSID', $token);
                            $session->save();

                            $cookie = new Cookie('SESSID', $token);
                            $response->headers->setCookie($cookie);

                            $securityToken = new SecurityToken();
                            $securityToken->setUserId($user->getId()); 
                            $securityToken->setToken($token);
                            $securityToken->setTimestamp(time());

                            $em->persist($securityToken);
                            $em->flush();

                            return $this->redirectToRoute('user_login');
                }
            }
            $error = "Wrong Username/Password";
        }
        $success = 0;
        if(isset($_GET['register']))
        {
            $success = 1;
        }

        $confirmation = 0;
        if(isset($_GET['confirmation']))
        {
            $confirmation = 1;
        }

        return $this->render('WeddingBundle:User:login.html.twig', array(
            'error'         => $error,
            'success'   => $success,
            'confirmation' => $confirmation,
            'inactive' => 0,
            $response
        ));
    }

    /**
     * @Route("/profile/{id}", name="user_profile")
     */
    public function profileAction(Request $request)
    {
        $currentUser = $this->getCurrentUser();
        if($currentUser == null){return $this->redirectToRoute('user_login');}
        $id = $currentUser->getId();
        
        $roleById = self::getRoleOfId($id);
   
        $em = $this->getDoctrine()->getEntityManager();

        switch($roleById){
            case "supplier":
                $user = $em->getRepository('WeddingBundle:User\Supplier')->find($id);
                $form = $this->createForm(SupplierForm::class, $user, array("roles" => self::getRolesList()));
                break;
            case "couple":
                $user = $em->getRepository('WeddingBundle:User\Couple')->find($id);
                $form = $this->createForm(CoupleForm::class, $user, array("roles" => self::getRolesList()));
                break;
            default:
                $user = false;
        }

        if(!$user) {
            echo "User does not exist";exit;
        }

        $form->handleRequest($request);
        //var_dump((string) $form->getErrors(true, false));exit;
        if ($form->isSubmitted() && $form->isValid()) {
                // perform some action, such as save the object to the database
                $em->persist($user);
                $em->flush();
                return $this->redirectToRoute('user_profile', array('id' => $id));
        }

        return $this->render('WeddingBundle:User:'.$roleById.'.html.twig', array(
            'form' => $form->createView()
        ));
        
    }

    public function logoutAction(Request $request)
    {
        $session = $request->getSession();
        $session->remove('SESSID');
        return $this->redirectToRoute('wedding_homepage');
    }

    /**
     * @Route("/profile/{id}/{field}/save", name="user_field_save")
     */
    public function saveFieldAction(Request $request)
    {
        $id = $this->getCurrentUser()->getId();
        $field = $request->get("field");

        $roleById = self::getRoleOfId($id);

        $em = $this->getDoctrine()->getEntityManager();

        switch($roleById){
            case "supplier":
                $user = $em->getRepository('WeddingBundle:User\Supplier')->find($id);
                break;
            case "couple":
                $user = $em->getRepository('WeddingBundle:User\Couple')->find($id);
                break;
            default:
                $user = false;
        }

        if(!$user) {
            echo "User does not exist";exit;
        }

        if(!empty($request->files)){
                $files = $request->files;
                foreach($files as $file) {
                    $value = uniqid().'.'.$file->guessExtension();
                    $file->move($this->getParameter('files'),$value);
                }
        }
        $user->{"set".$field}($value);
        $em->persist($user);
        $em->flush();

        $response = new Response(json_encode(json_decode('{"response":"'.$this->generateUrl('user_picture_path').'/'.$value.'"}')));
    	$response->headers->set('Content-Type', 'application/json');
        return $response;
    }

    private function getRolesList()
    {
        $em = $this->getDoctrine()->getEntityManager();
        $qb = $em->createQueryBuilder();
        $q  = $qb->select(array('r'))
           ->from('WeddingBundle:User\Roles', 'r')
           ->where(
             $qb->expr()->gt('r.id', 1)
           )
           ->orderBy('r.id', 'ASC')
           ->getQuery();
        return $q->getResult();
    }

    private function getRoleOfId($id)
    {
            $em = $this->getDoctrine()->getEntityManager();
            $user = $em->getRepository('WeddingBundle:User\Couple')->find($id);
            
            //if not couple, can be supplier, else does not exist
            if(!$user) {
                $user = $em->getRepository('WeddingBundle:User\Supplier')->find($id);
                return $user?"supplier":false;
            } else {
                return "couple";
            }

    }
}
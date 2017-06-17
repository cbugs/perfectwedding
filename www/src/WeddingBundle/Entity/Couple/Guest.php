<?php 
// src/WeddingBundle/Entity/Couple.php
namespace WeddingBundle\Entity\Couple;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Security\Core\User\UserInterface;
use WeddingBundle\Entity\User\Couple;

/**
 * @ORM\Entity
 */
class Guest
{

    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
    * @ORM\Column(type="integer")
    * @ORM\ManyToOne(targetEntity="WeddingBundle\Entity\User\Couple",inversedBy="budget")
    * @ORM\JoinColumn(referencedColumnName="id")
    */
    private $user_id;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $name;

    /**
     * @ORM\Column(type="integer", nullable=true)
     */
    private $contact_number;

    /**
     * @ORM\Column(type="string", length=255)
     * @Assert\Email()
     */
    private $email;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $category;

    /**
     * @ORM\Column(type="boolean", nullable=true)
     */
    private $child;

    /**
     * @ORM\Column(type="boolean", nullable=true)
     */
    private $meal;


    public function __construct($name, $contact_number, $email, $category, $child, $meal, $user_id)
    {
        $this->name = $name;
        $this->contact_number = $contact_number;
        $this->email = $email;
        $this->category = $category;
        $this->child = $child;
        $this->meal = $meal;
        $this->user_id = $user_id;
    }

    // other properties and methods
	public function getId(){
		return $this->id;
	}

	public function setId($id){
		$this->id = $id;
	}

	public function getName(){
		return $this->name;
	}

	public function setName($name){
		$this->name = $name;
	}

	public function getContact_number(){
		return $this->contact_number;
	}

	public function setContact_number($contact_number){
		$this->contact_number = $contact_number;
	}

	public function getEmail(){
		return $this->email;
	}

	public function setEmail($email){
		$this->email = $email;
	}

	public function getCategory(){
		return $this->category;
	}

	public function setCategory($category){
		$this->category = $category;
	}

	public function getChild(){
		return $this->child;
	}

	public function setChild($child){
		$this->child = $child;
	}

	public function getMeal(){
		return $this->meal;
	}

	public function setMeal($meal){
		$this->meal = $meal;
	}

}
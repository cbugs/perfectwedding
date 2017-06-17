<?php 
// src/WeddingBundle/Entity/Couple.php
namespace WeddingBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;

/**
 * @ORM\Entity
 */
class SecurityToken
{

    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
    * @ORM\Column(type="integer")
    * @ORM\ManyToOne(targetEntity="WeddingBundle\Entity\User\User",inversedBy="securityToken")
    * @ORM\JoinColumn(referencedColumnName="id")
    */
    private $userId;

    /**
     * @ORM\Column(type="string", length=1500, nullable=true)
     */
    private $token;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $timestamp;

   // other properties and methods

	public function getId(){
		return $this->id;
	}

	public function setId($id){
		$this->id = $id;
	}

	public function getUserId(){
		return $this->userId;
	}

	public function setUserId($userId){
		$this->userId = $userId;
	}

	public function getToken(){
		return $this->token;
	}

	public function setToken($token){
		$this->token = $token;
	}

	public function getTimestamp(){
		return $this->timestamp;
	}

	public function setTimestamp($timestamp){
		$this->timestamp = $timestamp;
	}

	public function __toString() {
		return (string)$this->token;
	}
}
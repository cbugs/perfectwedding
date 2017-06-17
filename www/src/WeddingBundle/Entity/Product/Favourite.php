<?php 

namespace WeddingBundle\Entity\Product;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use WeddingBundle\Entity\Product;
use WeddingBundle\Entity\User\Couple;

/**
 * @ORM\Entity
 */
class Favourite
{

    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
    * @ORM\Column(type="integer")
    * @ORM\ManyToOne(targetEntity="WeddingBundle\Entity\Product",inversedBy="favourite")
    * @ORM\JoinColumn(referencedColumnName="id")
    */
    private $product_id;

    /**
    * @ORM\Column(type="integer")
    * @ORM\ManyToOne(targetEntity="WeddingBundle\Entity\User\Couple",inversedBy="budget")
    * @ORM\JoinColumn(referencedColumnName="id")
    */
    private $user_id;

    /**
     * @ORM\Column(type="integer")
     */
    private $active;

    // other properties and methods

	public function getId(){
		return $this->id;
	}

	public function setId($id){
		$this->id = $id;
	}

	public function getProductId(){
		return $this->product_id;
	}

	public function setProductId($product_id){
		$this->product_id = $product_id;
	}

	public function getUser(){
		return $this->user_id;
	}

	public function setUser($user_id){
		$this->user_id = $user_id;
	}

	public function getActive(){
		return $this->active;
	}

	public function setActive($active){
		$this->active = $active;
	}
}
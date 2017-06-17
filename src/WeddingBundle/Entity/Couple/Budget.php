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
class Budget
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
     * @ORM\Column(type="integer", options={"default" : 0})
     */
    private $estimated_cost;

    /**
     * @ORM\Column(type="integer", options={"default" : 0})
     */
    private $actual;

    /**
     * @ORM\Column(type="integer", options={"default" : 0})
     */
    private $paid;

    /**
     * @ORM\Column(type="integer", options={"default" : 0})
     */
    private $due;

    // other properties and methods

    public function __construct($name, $estimated_cost, $actual, $paid, $due, $user_id)
    {
        $this->name = $name;
        $this->estimated_cost = $estimated_cost;
        $this->actual = $actual;
        $this->paid = $paid;
        $this->due = $due;
        $this->user_id = $user_id;
    }

    public function getId()
    {
        return $this->id;
    }

    public function getName()
    {
        return $this->name;
    }

    public function setName($name)
    {
        $this->name = $name;
    }

    public function getEstimatedCost()
    {
        return $this->estimated_cost;
    }

    public function setEstimatedCost($estimated_cost)
    {
        $this->estimated_cost = $estimated_cost;
    }

    public function getActual()
    {
        return $this->actual;
    }

    public function setActual($actual)
    {
        $this->actual = $actual;
    }

    public function getPaid()
    {
        return $this->paid;
    }

    public function setPaid($paid)
    {
        $this->paid = $paid;
    }

    public function getDue()
    {
        return $this->due;
    }

    public function setDue($due)
    {
        $this->due = $due;
    }

}
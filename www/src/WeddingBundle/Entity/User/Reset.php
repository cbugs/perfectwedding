<?php 

namespace WeddingBundle\Entity\User;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Security\Core\User\UserInterface;
use WeddingBundle\Entity\SecurityToken;

/**
 * @ORM\Entity
 */
class Reset
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
    private $userId;

    /**
     * @ORM\Column(type="string", length=255, unique=true)
     */
    private $value;


    public function __construct($userId)
    {
        $this->userId = $userId;
        $this->value = md5(uniqid($userId, true));
    }

    // other properties and methods

    public function getId()
    {
        return $this->id;
    }

    public function setId($id)
    {
        $this->id = $id;
    }

    public function getUserId()
    {
        return $this->userId;
    }

    public function setUserId($userId)
    {
        $this->userId = $userId;
    }

    public function getValue()
    {
        return $this->value;
    }

    public function setValue($value)
    {
        $this->value = $value;
    }

}
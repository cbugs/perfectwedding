<?php

namespace WeddingBundle\Entity\Listing;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Security\Core\User\UserInterface;
use WeddingBundle\Entity\SecurityToken;

/**
 * @ORM\Entity
 * @ORM\Table(name="parent")
 
 
 */

/**
 * @ORM\Entity
 * @UniqueEntity(fields="email", message="Email already taken")
 * @UniqueEntity(fields="username", message="Username already taken")
 * @ORM\InheritanceType("JOINED")
 */

class Featured {
  
  /**
   * @ORM\Id
   * @ORM\Column(type="integer")
   * @ORM\GeneratedValue(strategy="AUTO")
   */
  private $id;
  
  private $listingId;
  
  private $supplierId;
  
  private $timeSlots;
  
  private $date;
  
  private $isActive;
  
  
  public function getListingId() {
    return $this->listingId;
  }
  
  public function setListingId($listingId) {
    $this->listingId = $listingId;
  }
  
  public function getSupplierId() {
    return $this->supplierId;
  }
  
  public function setSupplierId($supplierId) {
    $this->supplierId = $supplierId;
  }
  
  public function getTimeSlots() {
    return $this->timeSlots;
  }
  
  public function setTimeSlots($timeSlots) {
    $this->timeSlots = $timeSlots;
  }
  
  public function getDate() {
    return $this->date;
  }
  
  public function setDate($date) {
    $this->date = $date;
  }
  
  public function getIsActive() {
    return $this->isActive;
  }
  
  public function setIsActive($isActive) {
    $this->isActive = $isActive;
  }
  
}
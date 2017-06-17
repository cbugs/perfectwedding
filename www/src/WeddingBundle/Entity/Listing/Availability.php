<?php

namespace WeddingBundle\Entity\Listing;


class Availability {
  
  /**
   * @ORM\Id
   * @ORM\Column(type="integer")
   * @ORM\GeneratedValue(strategy="AUTO")
   */
  private $id;
  
  private $listingId;
  
  private $startDate;
  
  private $endDate;
  
  private $reservedDate;
  
  public function getListingId() {
    return $this->listingId;
  }
  
  public function setListingId($listingId) {
    $this->listingId = $listingId;
  }
  
  public function getStartDate() {
    return $this->startDate;
  }
  
  public function setStartDate($startDate) {
    $this->startDate = $startDate;
  }
  
  public function getEndDate() {
    return $this->endDate;
  }
  
  public function setEndDate($endDate) {
    $this->endDate = $endDate;
  }
  
  public function getReservedDate() {
    return $this->reservedDate;
  }
  
  public function setReservedDate($reservedDate) {
    $this->reservedDate = $reservedDate;
  }
  
}
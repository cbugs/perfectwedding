<?php

namespace WeddingBundle\Entity\User;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;


/**
 * @ORM\Entity
 * @ORM\Table(name="pricing_plans")
 */


class PricingPlans {
  
  /**
   * @ORM\Id
   * @ORM\Column(type="integer")
   * @ORM\GeneratedValue(strategy="AUTO")
   */
  private $id;
  
  private $name;
  
  private $price;
  
  private $features;
  
  private $listingLimit;
  
  private $imagesLimit;
  
  private $videoLimit;
  
  public function getName() {
    return $this->name;
  }
  
  public function setName($name) {
    $this->name = $name;
  }
  
  public function getPrice() {
    return $this->price;
  }
  
  public function setPrice($price) {
    $this->price = $price;
  }
  
  public function getFeatures() {
    return $this->features;
  }
  
  public function setFeatures($features) {
    $this->features = $features;
  }
  
  public function getListingLimit() {
    return $this->listingLimit;
  }
  
  public function setListingLimit($listingLimit) {
    $this->listingLimit = $listingLimit;
  }
  
  public function getImagesLimit() {
    return $this->imagesLimit;
  }
  
  public function setImagesLimit($imagesLimit) {
    $this->imagesLimit = $imagesLimit;
  }
  
  public function getVideoLimit() {
    return $this->videoLimit;
  }
  
  public function setVideoLimit($videoLimit) {
    $this->videoLimit = $videoLimit;
  }
  
}
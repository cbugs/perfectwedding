<?php

namespace WeddingBundle\Entity\Listing;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;


/**
 * @ORM\Entity
 * @ORM\Table(name="listing")
 */

class Listing {
  
  /**
   * @ORM\Id
   * @ORM\Column(type="integer")
   * @ORM\GeneratedValue(strategy="AUTO")
   */
  private $id;
  
  private $name;
  
  private $categoryId;
  
  private $supplierId;
  
  private $ratingId;
  
  private $desc;
  
  private $features;
  
  private $images;
  
  private $videos;
  
  private $discount;
  
  private $location;
  
  private $price;
  
  
  public function getName() {
    return $this->name;
  }
  
  public function setName($name) {
    $this->name = $name;
  }
  
  public function getCategoryId() {
    return $this->categoryId;
  }
  
  public function setCategoryId($categoryId) {
    $this->categoryId = $categoryId;
  }
  
  public function getSupplierId() {
    return $this->supplierId;
  }
  
  public function setSupplierId($supplierId) {
    $this->supplierId = $supplierId;
  }
  
  public function getRatingId() {
    return $this->ratingId;
  }
  
  public function setRatingId($ratingId) {
    $this->ratingId = $ratingId;
  }
  
  public function getDesc() {
    return $this->desc;
  }
  
  public function setDesc($desc) {
    $this->desc = $desc;
  }
  
  public function getFeatures() {
    return $this->features;
  }
  
  public function setFeatures($features) {
    $this->features = $features;
  }
  
  public function getImages() {
    return $this->images;
  }
  
  public function setImages($images) {
    $this->images = $images;
  }
  
  public function getVideos() {
    return $this->videos;
  }
  
  public function setVideos($videos) {
    $this->videos = $videos;
  }
  
  public function getDiscount() {
    return $this->discount;
  }
  
  public function setDiscount($discount) {
    $this->discount = $discount;
  }
  
  public function getLocation() {
    return $this->location;
  }
  
  public function setLocation($location) {
    $this->location = $location;
  }
  
  public function getPrice() {
    return $this->price;
  }
  
  public function setPrice($price) {
    $this->price = $price;
  }
  
}
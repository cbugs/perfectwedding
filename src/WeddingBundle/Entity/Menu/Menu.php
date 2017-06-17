<?php
// src/WeddingBundle/Entity/Menu/Menu.php
namespace WeddingBundle\Entity\Menu;

abstract class Menu
{
    abstract protected function queryMenus();

    public function getMenus() 
    {
        echo $this->queryMenus();
    }
}

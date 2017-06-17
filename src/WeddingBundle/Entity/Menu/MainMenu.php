<?php
// src/WeddingBundle/Entity/Menu/MainMenu.php

namespace WeddingBundle\Entity;

use WeddingBundle\Entity\Menu\Menu;

class MainMenu extends Menu
{
    protected function queryMenus() 
    {
        return "main menus";
    }
}
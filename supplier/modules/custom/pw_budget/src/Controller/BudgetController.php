<?php

namespace Drupal\pw_budget\Controller;

class BudgetController {

    public function index() {
        return array(
            '#title' => 'blabla titiel',
            '#theme' => 'budget'
        );
    }

}
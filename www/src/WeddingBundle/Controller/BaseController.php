<?php
namespace WeddingBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;

class BaseController extends Controller
{
    protected $user;

    public function getCurrentUser()
    {
        if ($this->user === null) {
            $this->user = $this->get('app.security_listener')->getUser();
        }
        return $this->user;
    }

    public function getCurrentRole()
    {
        $sql = "SELECT dtype FROM user WHERE id = :id";
        $params['id'] = $this->getCurrentUser()->getId();
        $stmt = $this->entityManager->getConnection()->prepare($sql);
        $stmt->execute($params);var_dump($stmt->fetchAll(PDO::FETCH_COLUMN));exit;
        return $stmt->fetchAll(PDO::FETCH_COLUMN);
    }

    public static function callAPI($method, $url, $data = false)
    {
        $url = 'http://perfectwedding.4dcubes.com/supplier'.$url;
        $curl = curl_init();

        switch ($method)
        {
            case "POST":
                curl_setopt($curl, CURLOPT_POST, 1);

                if ($data)
                    curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
                break;
            case "PUT":
                curl_setopt($curl, CURLOPT_PUT, 1);
                break;
            default:
                if ($data)
                    $url = sprintf("%s?%s", $url, http_build_query($data));
        }

        // Optional Authentication:
        curl_setopt($curl, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
        curl_setopt($curl, CURLOPT_USERPWD, "username:password");

        curl_setopt($curl, CURLOPT_URL, $url);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);

        $result = curl_exec($curl);

        curl_close($curl);

        return $result;
    }

}
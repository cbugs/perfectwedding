<?php
echo "Begin: Pull";
exec('git pull', $output);
foreach ($output as $o) {
    echo $o . '<br/>';
}
echo "End: Pull code>";
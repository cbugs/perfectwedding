<?php
echo "Begin: Pull";
exec('git pull', $output);
foreach ($output as $o) {
    echo $o . '<br/>';
}
echo "End: Pull code>";
exec('php ~/perfectwedding/bin/console cache:clear', $output2);
foreach ($output2 as $o) {
    echo $o . '<br/>';
}
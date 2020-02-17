<?php
error_reporting(E_ALL);

echo "<h2>TCP/IP Connection</h2>\n";

$code = $_GET["code"];

$port = 11000;
$server_address = '72.220.5.176';

$sock = socket_create(AF_INET, SOCK_STREAM, SOL_TCP);
socket_bind($sock, $server_address, $port);
socket_listen($sock, 5);
$msgsock = socket_accept($sock);
$msg = "2 " . $code . "<EOF>";

$socket_write($msgsock, $msg, strlen($msg);
socket_close($msgsock);
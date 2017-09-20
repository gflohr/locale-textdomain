#! /usr/bin/env perl

use strict;

my $function = <<EOF;
nplurals=4; plural=(n%100==1 ? 0 : n%100==2 ? 1 : n%100==3 || n%100==4 ? 2 : 3);
EOF

$function =~ s/(nplurals|plural|n)/\$$1/g;

my $limit = $ARGV[0] || 20;

my ($nplurals, $plural);
my $output = '';
for (my $n = 0; $n < $limit; ++$n) {
    eval $function;
    $output .= "$plural, ";
    if ($n % 10 == 9) {
        $output =~ s/ $/\n/;
    }
}
$output =~ s/,\n?$//;
$output .= "\n";
$output =~ s/^/                   /gm;
print $output;

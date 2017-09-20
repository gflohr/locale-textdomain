#! /usr/bin/env perl

use strict;

my $function = <<EOF;
nplurals=3;plural=(n%10==1 && n%100!=11 ? 0 : n != 0 ? 1 : 2);
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

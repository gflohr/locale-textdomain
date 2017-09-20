#! /usr/bin/env perl

use strict;

my $function = <<EOF;
nplurals=3; plural=(n==1 ? 0 : n%10>=2 && n%10<=4 && (n%100<10 || n%100>=20) ? 1 : 2);
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

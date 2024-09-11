pragma circom 2.1.8;

template Main() {
    signal input x;
    signal input y;

    signal output out;

    signal a;
    signal b;

    1 === x + y;
    a <== x * y; 
    b <-- a * a;

    out <== b * a;
}

component main = Main();
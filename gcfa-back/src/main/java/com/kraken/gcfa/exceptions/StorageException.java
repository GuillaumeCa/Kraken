package com.kraken.gcfa.exceptions;

import java.io.IOException;

/**
 * Created by Guillaume on 11/04/2017.
 * gcfa-back
 */
public class StorageException extends Throwable {
    public StorageException(String s) {
        super(s);
    }

    public StorageException(String s, IOException e) {
        super(s, e);
    }
}

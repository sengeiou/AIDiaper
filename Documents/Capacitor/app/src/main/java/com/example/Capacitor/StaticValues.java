package com.example.Capacitor;

/**
 * Created by Alex on 2017/8/13.
 */

public class StaticValues {
    public static int Version;
    public static int MinWetnessDate=999;
    public static int getwholeDatelength(){
        if(Version==0)
            return 25;
        if(Version==1)
            return 27;
        else
            return 31;
    }
    public static int getDataPosition(){
        if(Version==0)
            return 18;
        if(Version==1)
            return 9;
        if(Version==2)
            return 14;
        else
            return 9;
    }

}

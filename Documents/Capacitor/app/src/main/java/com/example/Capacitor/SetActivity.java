package com.example.Capacitor;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.MenuItem;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

/**
 * Created by wuruizhi on 11/8/15.
 */
public class SetActivity  extends Activity {

    private final static String TAG = SetActivity.class.getSimpleName();
    public static final String EXTRAS_DEVICE_NAME = "DEVICE_NAME";
    public static final String EXTRAS_DEVICE_ADDRESS = "DEVICE_ADDRESS";
    public static final String EXTRAS_T1 = "T1";
    public static final String EXTRAS_T2 = "T2";

    private String mDeviceName;
    private String mDeviceAddress;
    private HolloBluetooth mble;
    private Context context;
    private EditText mT1Edit;
    private EditText mT2Edit;

    @Override
    protected void onCreate(Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.set_info);

        final Intent intent = getIntent();
        mDeviceName = intent.getStringExtra(EXTRAS_DEVICE_NAME);
        mDeviceAddress = intent.getStringExtra(EXTRAS_DEVICE_ADDRESS);

        getActionBar().setTitle(mDeviceName);
        getActionBar().setDisplayHomeAsUpEnabled(true);
        context = this;

        mT1Edit = (EditText)findViewById(R.id.t1);
        mT1Edit.setText(intent.getStringExtra(EXTRAS_T1));
        mT2Edit = (EditText)findViewById(R.id.t2);
        mT2Edit.setText(intent.getStringExtra(EXTRAS_T2));

        mble = HolloBluetooth.getInstance(getApplicationContext());	//获取蓝牙实例

        Button setBt = (Button)findViewById(R.id.setBt);

        setBt.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                byte[] sendData = new byte[7];
                sendData[0] = 0x55;
                sendData[1] = 0x10;
                sendData[2] = 0x07;
                sendData[3] = (byte)(Integer.parseInt(mT1Edit.getText().toString())/5);
                sendData[4] = (byte)(Integer.parseInt(mT2Edit.getText().toString())/5);
                sendData[5] = 0x00;
                sendData[6] = (byte)0xEE;

                sendData[5] = checkBit(sendData);

                if (!mble.sendData(sendData)) {
                    Toast.makeText(context,"设置失败",Toast.LENGTH_SHORT).show();
                }

            }
        });
    }


    byte checkBit(byte[] data)
    {
        if (data.length < 5) {
            return 0;
        }

        byte result = data[2];

        for (int i=3; i<data.length-2; i++){
            result ^= data[i];
        }

        result += data[0];

        return result;
//		return 0;
    }


    @Override
    public boolean onOptionsItemSelected(MenuItem item)
    {
        switch (item.getItemId())
        {
            case android.R.id.home:
                onBackPressed();
                return true;

            default:
                break;
        }
        return super.onOptionsItemSelected(item);
    }

    @Override
    protected void onDestroy()
    {
        super.onDestroy();

//        mble.disconnectDevice();
//        Log.d(TAG, "destroy");
//        mble.disconnectLocalDevice();
//        Log.d(TAG, "销毁");

    }
}

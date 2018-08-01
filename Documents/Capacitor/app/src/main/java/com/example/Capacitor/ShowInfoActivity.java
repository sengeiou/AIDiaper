package com.example.Capacitor;


import android.app.Activity;
import android.app.AlertDialog;
import android.bluetooth.BluetoothAdapter;
import android.bluetooth.BluetoothDevice;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.graphics.Color;
import android.media.MediaPlayer;
import android.net.Uri;
import android.os.Bundle;
import android.os.Handler;
import android.os.Message;
import android.util.Log;
import android.view.KeyEvent;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.view.Window;
import android.view.WindowManager;
import android.view.animation.AccelerateDecelerateInterpolator;
import android.view.animation.AlphaAnimation;
import android.view.animation.Animation;
import android.view.animation.AnticipateInterpolator;
import android.view.animation.DecelerateInterpolator;
import android.view.animation.LinearInterpolator;
import android.view.animation.OvershootInterpolator;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.CompoundButton;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.RadioGroup;
import android.widget.SeekBar;
import android.widget.Spinner;
import android.widget.Switch;
import android.widget.TextView;
import android.widget.Toast;


import com.google.android.gms.appindexing.Action;
import com.google.android.gms.appindexing.AppIndex;
import com.google.android.gms.common.api.GoogleApiClient;

import java.util.Timer;
import java.util.TimerTask;

import static android.view.WindowManager.*;


public class ShowInfoActivity extends Activity {
	private final static String TAG = ShowInfoActivity.class.getSimpleName();

	public static final String EXTRAS_DEVICE_NAME = "DEVICE_NAME";
	public static final String EXTRAS_DEVICE_ADDRESS = "DEVICE_ADDRESS";

	private String mDeviceName;
	private String mDeviceAddress;
	private HolloBluetooth mble;
	private Context context;
	private CircleView mLight;


	private ImageView mMainView;
	public static int V1 = 350;
	public static int V2 = 250;
	public static int V3 = 180;
	public static int level = 0;
	private int CONFIRMTIMES = 3;
	private int currentConfirmTimes = 0;
	int dataS = 0;

	byte[] angleData={0,0,0};


    private SeekBar seekBar = null;
	private boolean tempMute2 = false;
	private boolean tempMute3 = false;
	private MediaPlayer myplayer2;
	private MediaPlayer myplayer3;
	private boolean neverplayed2 = true;
	private boolean neverplayed3 = true;

	private TextView mTips;
	private TextView mBleTips;
	private byte[] mData;
	private TextView mCValue;
	private TextView mWetnessValue;
    private TextView mCBackground;
	private TextView textViewCC;
	private TextView textViewTemprature;
	private TextView textViewNoMove;
	private Button mT1Bt;
	private Button mT2Bt;
	private Button mV0Bt;
	private Button mV1Bt;

	private Boolean upsidedowning=false;
	public Boolean soundable=true;

	private Boolean mIsConnected;
	private static final long SCAN_PERIOD = 3000;
	private Handler mHandler = new Handler();
	private Handler mTimeOutHandler = new Handler();
	/**
	 * ATTENTION: This was auto-generated to implement the App Indexing API.
	 * See https://g.co/AppIndexing/AndroidStudio for more information.
	 */
	private GoogleApiClient client;

	/*public ShowInfoActivity() {

	}*/

	//private final String m[]={"Diaper L","Diaper M","Insert Pad"};
	private TextView mtextview;
	private Spinner mspinner;
	private ArrayAdapter<String> madapter;
	int sensitivityV=2;
	int CCfactor=500/80;

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		// 隐藏标题栏
		requestWindowFeature(Window.FEATURE_NO_TITLE);
		// 隐藏状态栏
		getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN,
				WindowManager.LayoutParams.FLAG_FULLSCREEN);
		setContentView(R.layout.show_info);

		//spinner初始化
		String m[]={getResources().getString(R.string.DiaperL),getResources().getString(R.string.DiaperM),getResources().getString(R.string.InsertPad)};
		mspinner=(Spinner)findViewById(R.id.spinnerChoose);
		madapter=new ArrayAdapter<String>(this, android.R.layout.simple_spinner_item, m);
		madapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
		mspinner.setAdapter(madapter);
		mspinner.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {

			@Override
			public void onItemSelected(AdapterView<?> arg0, View arg1,
									   int arg2, long arg3) {
				// TODO Auto-generated method stub
				if(arg2==0 ){
					CCfactor=1;
				}
				else if(arg2 == 1){
					CCfactor=2;
				}
				else
				{
					CCfactor=3;
				}


			}

			@Override
			public void onNothingSelected(AdapterView<?> arg0) {
				// TODO Auto-generated method stub

			}

		});


		myplayer2 = MediaPlayer.create(this, R.raw.song2);
		myplayer3 = MediaPlayer.create(this, R.raw.song2);

		//Alex

		mIsConnected = false;

		final Intent intent = getIntent();
		mDeviceName = intent.getStringExtra(EXTRAS_DEVICE_NAME);
		mDeviceAddress = intent.getStringExtra(EXTRAS_DEVICE_ADDRESS);

		//getActionBar().setTitle(mDeviceName);
		//getActionBar().setDisplayHomeAsUpEnabled(true);

		context = this;
		if(StaticValues.Version==0) {
			mData = new byte[7];
		}
		else if(StaticValues.Version==1) {
			mData = new byte[8];
		}
		else if(StaticValues.Version==2) {
			mData = new byte[7];
		}

		mble = HolloBluetooth.getInstance(getApplicationContext());    //获取蓝牙实例

		mLight = (CircleView) findViewById(R.id.light);

		mMainView = (ImageView) findViewById(R.id.imgVmain);
		mMainView.setOnClickListener(new View.OnClickListener() {
			@Override
			public void onClick(View view) {
				StopPlaying(0);
			}
		});
		Switch mswitch=(Switch)findViewById(R.id.soundswitch);
		mswitch.setOnCheckedChangeListener(new CompoundButton.OnCheckedChangeListener() {

			@Override
			public void onCheckedChanged(CompoundButton buttonView,
										 boolean isChecked) {
				// TODO Auto-generated method stub
				if (isChecked) {
					soundable = true;//打开
				} else {
					soundable = false;// 关闭
					StopPlaying(0);
				}
			}
		});
		Switch switch80=(Switch)findViewById(R.id.switch80);
		switch80.setVisibility(View.INVISIBLE);//去掉旧版本
		switch80.setOnCheckedChangeListener(new CompoundButton.OnCheckedChangeListener() {

			@Override
			public void onCheckedChanged(CompoundButton buttonView,
										 boolean isChecked) {
				// TODO Auto-generated method stub
				if (isChecked) {
					seekBar.setEnabled(false);
					//打开
					greenYV = 20; //黄绿色触发值 相当于480
					redV = 80;//红色触发值 相当于200
					VstepV = (redV - greenYV) / 3;
					yellowV = greenYV + VstepV;//黄色触发值
					orangeV = yellowV + VstepV;//橙色触发值
				} else {

					seekBar.setEnabled(true);

					if(sensitivityV==0) {
						greenYV =4; //黄绿色触发值 相当于520
						redV = 30;//红色触发值 相当于400
						yellowV = 11;//黄色触发值
						orangeV =22;//橙色触发值
					}
					else if(sensitivityV==1) {
						greenYV = 11; //黄绿色触发值 相当于480
						redV = 60;//红色触发值 相当于267
						VstepV = (redV - greenYV) / 3;
						yellowV = greenYV + VstepV;//黄色触发值
						orangeV = yellowV + VstepV;//橙色触发值
					}
					else if(sensitivityV==2) {
						greenYV = 20; //黄绿色触发值 相当于480
						redV = 90;//红色触发值 相当于200
						VstepV = (redV - greenYV) / 3;
						yellowV = greenYV + VstepV;//黄色触发值
						orangeV = yellowV + VstepV;//橙色触发值
					}
					else if(sensitivityV==3) {
						greenYV = 20; //黄绿色触发值 相当于480
						redV = 120;//红色触发值 相当于160
						VstepV = (redV - greenYV) / 3;
						yellowV = greenYV + VstepV;//黄色触发值
						orangeV = yellowV + VstepV;//橙色触发值
					}
					else if(sensitivityV==4) {
						greenYV = 20; //黄绿色触发值 相当于480
						redV = 150;//红色触发值 相当于133
						VstepV = (redV - greenYV) / 3;
						yellowV = greenYV + VstepV;//黄色触发值
						orangeV = yellowV + VstepV;//橙色触发值
					}


				}
				final TextView tcC00=(TextView)findViewById(R.id.txColor00);
				final TextView tcC0=(TextView)findViewById(R.id.txColor0);
				final TextView tcC1=(TextView)findViewById(R.id.txColor1);
				final TextView tcC2=(TextView)findViewById(R.id.txColor2);
				final TextView tcC3=(TextView)findViewById(R.id.txColor3);
				tcC00.setText(String.valueOf("0"));
				tcC0.setText(String.valueOf(greenYV));
				tcC1.setText(String.valueOf(yellowV));
				tcC2.setText(String.valueOf(orangeV));
				tcC3.setText(String.valueOf(redV));
				resetAllWetnessData();
			}
		});


		//settings
       final EditText eTD0=(EditText)findViewById(R.id.eTD0);
		final EditText eTD3=(EditText)findViewById(R.id.eTD3);
		eTD0.setText(String.valueOf(greenYV));
		eTD3.setText(String.valueOf(redV));
		Button mBtnSet = (Button) findViewById(R.id.btnSet);
		mBtnSet.setOnClickListener(new View.OnClickListener() {
			@Override
			public void onClick(View view) {
                greenYV=Integer.parseInt(eTD0.getText().toString());
                redV=Integer.parseInt(eTD3.getText().toString()) ;
				if(greenYV<20)
                {
                    Toast.makeText(context, "Green value should not below 20", Toast.LENGTH_SHORT).show();
                    eTD0.setText("20");
                    greenYV=20;


                }
                if(redV<=greenYV)
                {
                    Toast.makeText(context, "Red value should above "+(greenYV+3), Toast.LENGTH_SHORT).show();
                    redV=greenYV+3;
                    eTD3.setText(String.valueOf(redV));

                }

                VstepV=(redV - greenYV) / 3;
                yellowV=greenYV + VstepV;//黄色触发值
                orangeV=yellowV + VstepV;//橙色触发值

                Toast.makeText(context, "Successful!", Toast.LENGTH_SHORT).show();


			}
		});

        //报警值设定

        seekBar = (SeekBar) findViewById(R.id.seekBar);
        //设置该进度条的最大值,默认情况下为O
        seekBar.setMax(4);
        seekBar.setOnSeekBarChangeListener(seekBarListener);




		mCValue = (TextView) findViewById(R.id.cValue);
		mWetnessValue = (TextView) findViewById(R.id.textView3);
		textViewCC=(TextView)findViewById(R.id.textViewCC);
        mCBackground  = (TextView) findViewById(R.id.cBackground);
		textViewTemprature= (TextView) findViewById(R.id.textViewTemprature);

//		mT1Bt = (Button)findViewById(R.id.t1);
//		mT1Bt.setEnabled(false);
//		mT2Bt = (Button)findViewById(R.id.t2);
//		mT2Bt.setEnabled(false);
		mV0Bt = (Button) findViewById(R.id.v0);
		mV0Bt.setEnabled(false);
		mV1Bt = (Button) findViewById(R.id.v1);
		textViewNoMove=(TextView)findViewById((R.id.textViewNoMove));
		mV1Bt.setEnabled(false);
		mV1Bt.setText("Up/Down");


		mLight.setCircleColor(Color.WHITE);
		mLight.setBorderWidth(4);
		mLight.setBorderColor(Color.BLACK);

		mTips = (TextView) findViewById(R.id.tips);
		mBleTips = (TextView) findViewById(R.id.ble_tips);
		mBleTips.setText("");

		mble.setScanCallBack(mLeScanCallback);

		scanLeDevice(true);

		// ATTENTION: This was auto-generated to implement the App Indexing API.
		// See https://g.co/AppIndexing/AndroidStudio for more information.
		client = new GoogleApiClient.Builder(this).addApi(AppIndex.API).build();
	}

    @Override
    public boolean onKeyDown(int keyCode, KeyEvent event) {

        //按下键盘上返回按钮

               if(keyCode == KeyEvent.KEYCODE_BACK){

                        new AlertDialog.Builder(this)

                            .setTitle(getResources().getString(R.string.Quit))
									.setMessage(getResources().getString(R.string.QuitConfirm))
											.setNegativeButton(getResources().getString(R.string.Cancel), new DialogInterface.OnClickListener() {
												@Override
												public void onClick(DialogInterface dialog, int which) {
												}
											})
											.setPositiveButton(getResources().getString(R.string.Confirm), new DialogInterface.OnClickListener()

											{
												public void onClick(DialogInterface dialog, int whichButton) {
													finish();
												}
											}).show();

                        return true;
                    }else{
                        return super.onKeyDown(keyCode, event);
                    }
            }



//	Runnable mThreadTimeOut = new Runnable() {
//		public void run() {
//
//			runOnUiThread(capLeft);
//
//		}
//	};

	Runnable cancelScan = new Runnable() {
		@Override
		public void run() {
			mble.stopLeScan();
			try {
				Thread.sleep(200);
			} catch (InterruptedException e) {
				e.printStackTrace();
			}
			mble.startLeScan();
			mHandler.postDelayed(cancelScan, SCAN_PERIOD);
		}
	};

	//enable = true表示蓝牙开始扫描，否则表示停止扫描
	private void scanLeDevice(final boolean enable) {
		if (enable) {
			// SCAN_PERIOD 秒后停止扫描
			mHandler.postDelayed(cancelScan, SCAN_PERIOD);

			mble.startLeScan();    //开始蓝牙扫描
		} else {
			//取消停止扫描的线程
			mHandler.removeCallbacks(cancelScan);
			mble.stopLeScan();    //停止蓝牙扫描
		}
	}

	// 扫描的结果
	private BluetoothAdapter.LeScanCallback mLeScanCallback =
			new BluetoothAdapter.LeScanCallback() {
				@Override
				public void onLeScan(final BluetoothDevice device, final int rssi, final byte[] scanRecord) {
					if (device.getAddress().equals(mDeviceAddress)) {
						int mlength=StaticValues.getwholeDatelength();
						if (scanRecord.length < mlength) {
							return;
						}

//						mTimeOutHandler.removeCallbacks(mThreadTimeOut);
//						runOnUiThread(capEnter);
						int mdataPosition=StaticValues.getDataPosition();
						for (int i = mdataPosition; i < (mData.length + mdataPosition); i++) {
							mData[i - mdataPosition] = scanRecord[i];
						}
						angleData[0]= scanRecord[mdataPosition-3];
						angleData[1]= scanRecord[mdataPosition-2];
						angleData[2]= scanRecord[mdataPosition-1];

						runOnUiThread(capShowInfo);
//						mTimeOutHandler.postDelayed(mThreadTimeOut,30000);
					}
				}
			};


	@Override
	public boolean onMenuItemSelected(int featureId, MenuItem item) {
		switch (item.getItemId()) {
			case R.id.set:

				final Intent intent = new Intent(this, SetActivity.class);
				intent.putExtra(SetActivity.EXTRAS_DEVICE_NAME, mDeviceName);
				intent.putExtra(SetActivity.EXTRAS_DEVICE_ADDRESS, mDeviceAddress);

				startActivity(intent);

				break;
		}
		return super.onMenuItemSelected(featureId, item);
	}





	//Add by Alex新算法
    int preData=0; //前一次数据值
    int currentColor = 0; //0-5分别是绿，黄绿，黄，橙，红

    int greenYV=20; //黄绿色触发值 相当于480
    int redV=90;//红色触发值 相当于200
    int VstepV=(redV-greenYV)/3;
    int yellowV=greenYV + VstepV;//黄色触发值
    int orangeV=yellowV + VstepV;//橙色触发值

    int alarmV=4;
    //add by alex 设计报警值
    /**
     * SeekBarListener
     * 定义一个监听器,该监听器负责监听进度条进度的改变
     */
    private SeekBar.OnSeekBarChangeListener seekBarListener = new SeekBar.OnSeekBarChangeListener() {

        /**
         * 当用户结束对滑块滑动时,调用该方法
         */
        public void onStopTrackingTouch(SeekBar seekBar) {
            // TODO Auto-generated method stub


        }

        /**
         * 当用户开始滑动滑块时调用该方法
         */
        public void onStartTrackingTouch(SeekBar seekBar) {
            // TODO Auto-generated method stub

        }

        /**
         * 当进度条发生变化时调用该方法
         */
        public void onProgressChanged(SeekBar seekBar, int progress,
                                      boolean fromUser) {
            // TODO Auto-generated method stub
            //alarmV=progress;
			resetAllWetnessData();
			sensitivityV = seekBar.getProgress();
			if(sensitivityV==0) {
				greenYV =4; //黄绿色触发值 相当于520
				redV = 30;//红色触发值 相当于400
				yellowV = 11;//黄色触发值
				orangeV =22;//橙色触发值
			}
			else if(sensitivityV==1) {
				greenYV = 11; //黄绿色触发值 相当于480
				redV = 60;//红色触发值 相当于267
				VstepV = (redV - greenYV) / 3;
				yellowV = greenYV + VstepV;//黄色触发值
				orangeV = yellowV + VstepV;//橙色触发值
			}
			else if(sensitivityV==2) {
				greenYV = 20; //黄绿色触发值 相当于480
				redV = 90;//红色触发值 相当于200
				VstepV = (redV - greenYV) / 3;
				yellowV = greenYV + VstepV;//黄色触发值
				orangeV = yellowV + VstepV;//橙色触发值
			}
			else if(sensitivityV==3) {
				greenYV = 20; //黄绿色触发值 相当于480
				redV = 120;//红色触发值 相当于160
				VstepV = (redV - greenYV) / 3;
				yellowV = greenYV + VstepV;//黄色触发值
				orangeV = yellowV + VstepV;//橙色触发值
			}
			else if(sensitivityV==4) {
				greenYV = 20; //黄绿色触发值 相当于480
				redV = 150;//红色触发值 相当于133
				VstepV = (redV - greenYV) / 3;
				yellowV = greenYV + VstepV;//黄色触发值
				orangeV = yellowV + VstepV;//橙色触发值
			}

			final TextView tcC00=(TextView)findViewById(R.id.txColor00);
			final TextView tcC0=(TextView)findViewById(R.id.txColor0);
			final TextView tcC1=(TextView)findViewById(R.id.txColor1);
			final TextView tcC2=(TextView)findViewById(R.id.txColor2);
			final TextView tcC3=(TextView)findViewById(R.id.txColor3);
			tcC00.setText(String.valueOf("0"));
			tcC0.setText(String.valueOf(greenYV));
			tcC1.setText(String.valueOf(yellowV));
			tcC2.setText(String.valueOf(orangeV));
			tcC3.setText(String.valueOf(redV));


        }
    };

   	/*int D0 = 24000/(greenYV+30);
    int D1 = 24000/(yellowV+30);
    int D2 = 24000/(orangeV+30);
	int D3 = 24000/(redV+30);*/






	int setS1 =  30;//750; //S之初始设置值
	int setS2 = 30;//1500;
	int setS3 = 30;// 2250;
	int setS4 = 30;//3000;
	int setS5 = 30;//4500;
	int setS6 = 30;//6000;
	int S1 = setS1;  //第一级湿度累加触发值设置
	int S2 = setS2;
	int S3 = setS3;
	int S4 = setS4;
	int S5 = setS5;
	int S6 = setS6;
	boolean update=false;//用来标记是否要升级为下个等级

	Boolean isFirstTime=true; //表示首次运行，用来使某段程序只运行一次

    Boolean isFlicking=false; //表示正在闪烁
    TimerTask mTimerTask;
    Timer mTimer;

	long preDataTime = 0;  //前一数据的接收时间

	void updateNewValue(int DataValue)

	{


        //先计算每个数据的时间以及前一个数据的时间
		long currentDataTime = 0;

		currentDataTime = (System.currentTimeMillis() / 1000);
        int T;//时间差
        if(preDataTime==0)//首次时间差为0
        {
            T=0;
        }
        else
        {
            T = (int) (currentDataTime - preDataTime);
        }
		preDataTime=currentDataTime;


        //此段程序用来取消手摸尿裤外部产品的干扰
        /*if(currentColor!=0) {   //只有非绿色情况下才需要查看状态
            if (preData!= 0) {
                if(T!=0){
                    if((D-preData)/T > Dstep)
                    {
                        //暂未启用
                    }
                }
            }
            preData =D ;

        }*/

		final TextView sValue=(TextView)findViewById(R.id.sValue);
		final TextView tcC00=(TextView)findViewById(R.id.txColor00);
		final TextView tcC0=(TextView)findViewById(R.id.txColor0);
		final TextView tcC1=(TextView)findViewById(R.id.txColor1);
		final TextView tcC2=(TextView)findViewById(R.id.txColor2);
		final TextView tcC3=(TextView)findViewById(R.id.txColor3);

		//final TextView tcC5=(TextView)findViewById(R.id.txColor5);


		switch (currentColor) {
			case 0: {
				if(isFirstTime)//默认就是0级 首次进入时设置绿色
				{
					mCBackground.setBackgroundColor(Color.rgb(0, 255, 0));
                    sValue.setText(String.valueOf(S1));
					tcC00.setBackgroundColor(Color.rgb(0, 255, 0));
					mMainView.setVisibility(View.VISIBLE);
					if(!upsidedowning)mMainView.setImageResource(R.drawable.diaper0);
					isFirstTime=false;//不再进入此段程序
				}
				if(DataValue>=greenYV) { //数值小到触发值

						S1 = S1 - (DataValue + VstepV -greenYV ) * T;
					//开始闪烁
                    startFlick(mCBackground);

						if(S1<=0)//S值减到0以下，升湿度等级
						{
							update=true;

						}
						else
						{
							update=false;
						}


					//根据update情况 改变显示内容
					runOnUiThread(new Runnable() {
						public void run() {

							if (update == true) {

								currentColor = 1; //升到下一等级
                                mCBackground.setBackgroundColor(Color.rgb(180, 255, 0));//改变颜色到黄绿
								tcC0.setBackgroundColor(Color.rgb(180, 255, 0));
								//升到下等级前，共用的值全部恢复
								isFirstTime=true;
                                update=false;
								sValue.setText(String.valueOf(S2));//显示新S值



							}
                            else
                            {
                                sValue.setText(String.valueOf(S1));//显示S值
                                mCBackground.setBackgroundColor(Color.rgb(180*(setS1-S1)/setS1, 255, 0));//渐变颜色到黄绿
                            }
						}
					});
				}
				else//数据大于触发值
				{
					//停止闪烁
                    stopFlick(mCBackground);
					if(!upsidedowning)mMainView.setImageResource(R.drawable.diaper0);
				}
				break;
			}
			case 1: {
                //判断是否要播放提示音,0代表不报警
                if(alarmV<=1 && alarmV!=0)
                {
                    if(!tempMute2)
                    {
                        playSound2();
                    }
                }
				mMainView.setVisibility(View.VISIBLE);
				if(!upsidedowning)mMainView.setImageResource(R.drawable.diaper1);

                if(DataValue>=yellowV) { //数值大到触发值

                    S2 = S2 - (DataValue + VstepV -yellowV ) * T;
						//开始闪烁
                    startFlick(mCBackground);
						if(S2<=0)
						{
							update=true;
						}
						else
						{
							update=false;
						}

					//改变显示内容
					runOnUiThread(new Runnable() {
						public void run() {

							if (update==true) {
								currentColor = 2;
                                mCBackground.setBackgroundColor(Color.rgb(255,255,0));
								tcC1.setBackgroundColor(Color.rgb(255,255, 0));
								//升到下等级前，共用的值全部恢复
								isFirstTime=true;
                                update=false;
								sValue.setText(String.valueOf(S3));
                                //强制把静音返回
                                tempMute2=false;

							}
                            else
                            {
                                mCBackground.setBackgroundColor(Color.rgb( ( 75 * (setS2-S2) / setS2 ) + 180 , 255 , 0));
                                sValue.setText(String.valueOf(S2));
                            }
						}
					});


				}
				else//数据大于触发值
				{

					//停止闪烁
                    stopFlick(mCBackground);
				}
				break;
			}
			case 2: {
                //判断是否要播放提示音，0代表不报警
                if(alarmV<=2 && alarmV!=0)
                {
                    if(!tempMute2)
                    {
                        playSound2();
                    }
                }
				mMainView.setVisibility(View.VISIBLE);
				if(!upsidedowning)mMainView.setImageResource(R.drawable.diaper1);

                if(DataValue>=orangeV) { //数值大到触发值

                    S3 = S3 - (DataValue + VstepV -orangeV ) * T;
						//开始闪烁
                    startFlick(mCBackground);
						if(S3<=0)
						{
							update=true;
						}
						else
						{
							update=false;
						}


					//改变显示内容
					runOnUiThread(new Runnable() {
						public void run() {

							if (update==true) {
								currentColor = 3;
                                mCBackground.setBackgroundColor(Color.rgb(255, 180, 0));
								tcC2.setBackgroundColor(Color.rgb(255, 180, 0));
								//升到下等级前，共用的值全部恢复
								isFirstTime=true;
                                update=false;
								sValue.setText(String.valueOf(S4));
                                //强制把静音返回
                                tempMute2=false;
							}
                            else
                            {
                                mCBackground.setBackgroundColor(Color.rgb(255, (75*S3/setS3)+180, 0));
                                sValue.setText(String.valueOf(S3));
                            }
						}
					});

				}
				else
				{

					//停止闪烁
                    stopFlick(mCBackground);
				}
				break;
			}
			case 3: {
                //判断是否要播放提示音，0代表不报警
                if(alarmV<=3 && alarmV!=0)
                {
                    if(!tempMute2)
                    {
                        playSound2();
                    }
                }
				mMainView.setVisibility(View.VISIBLE);
				if(!upsidedowning)mMainView.setImageResource(R.drawable.diaper2);

                if(DataValue>=redV) { //数值大到触发值

                    S4 = S4 - (DataValue + VstepV -redV ) * T;
						//开始闪烁
                    startFlick(mCBackground);
						if(S4<=0)
						{
							update=true;
						}
						else
						{
							update=false;
						}


					//改变显示内容
					runOnUiThread(new Runnable() {
						public void run() {

							if (update == true) {

								currentColor = 4;
                                mCBackground.setBackgroundColor(Color.rgb(255,0,0));
								tcC3.setBackgroundColor(Color.rgb(255,0,0));
								isFirstTime=true;
                                update=false;
								sValue.setText(String.valueOf(S5));
                                //强制把静音返回
                                tempMute2=false;

							}
                            else
                            {
                                mCBackground.setBackgroundColor(Color.rgb(255,(180*S4/setS4),0));
                                sValue.setText(String.valueOf(S4));
                            }
						}

					});

				}

				else
				{

					//停止闪烁
                    stopFlick(mCBackground);
				}
				break;
			}
            case 4:{
                //判断是否要播放提示音，0代表不报警
                if(alarmV<=4 && alarmV!=0)
                {
                    if(!tempMute2)
                    {
                        playSound2();
						mMainView.setVisibility(View.VISIBLE);
						if(!upsidedowning)mMainView.setImageResource(R.drawable.diaper3);
                    }
                }

                break;
            }

		}

	}
	void resetAllWetnessData(){
        stopFlick(mCValue);
        currentColor = 0;
        isFirstTime=true;
		StaticValues.MinWetnessDate=999;
		S1 = setS1;
		S2 = setS2;
		S3 = setS3;
		S4 = setS4;
		S5 = setS5;
		S6 = setS6;
		final TextView tcC00=(TextView)findViewById(R.id.txColor00);
		final TextView tcC0=(TextView)findViewById(R.id.txColor0);
		final TextView tcC1=(TextView)findViewById(R.id.txColor1);
		final TextView tcC2=(TextView)findViewById(R.id.txColor2);
		final TextView tcC3=(TextView)findViewById(R.id.txColor3);

		//final TextView tcC5=(TextView)findViewById(R.id.txColor5);
		runOnUiThread(new Runnable() {
			public void run() {
				TextView sValue=(TextView)findViewById(R.id.sValue);
				sValue.setText("");
                mCBackground.setBackgroundColor(Color.rgb(0xE0, 0xE0, 0xE0));
				tcC00.setBackgroundColor(Color.rgb(0xE0, 0xE0, 0xE0));
				tcC0.setBackgroundColor(Color.rgb(0xd8, 0xd8, 0xd8));
				tcC1.setBackgroundColor(Color.rgb(0xD0, 0xD0, 0xD0));
				tcC2.setBackgroundColor(Color.rgb(0xC8, 0xC8, 0xC8));
				tcC3.setBackgroundColor(Color.rgb(0xc0, 0xc0, 0xc0));


				}

		});
	}

    /**

     * 开启View闪烁效果

     *

     * */

    private void startFlick( View view ){

        /*if( null == view ){

            return;

        }
        if( isFlicking ){

            return;

        }*/
        /*Animation alphaAnimation = new AlphaAnimation( 1.0f, 0.1f );

        alphaAation.setDuration(800);
        alphaAnimation.setInterpolator( new LinearInterpolator( ) );

        alphaAnimation.setRepeatCount( Animation.INFINITE );

        alphaAnimation.setRepeatMode( Animation.REVERSE );

        view.startAnimation( alphaAnimation );*/

       // setTimerTask();
       /* mTimer=new Timer();
        setTimerTask();
        isFlicking=true;
        */

    }
    private void setTimerTask() {
        mTimer.schedule(new TimerTask() {
            @Override
            public void run() {
                runOnUiThread(new Runnable() {
                    public void run() {
                        if(mCBackground.getVisibility()==View.VISIBLE)
                        {
                            mCBackground.setVisibility(View.INVISIBLE);
                        }
                        else
                        {
                            mCBackground.setVisibility(View.VISIBLE);
                        }
                    }
                });
            }
        }, 0 , 500/* 表示1000毫秒之後，每隔1000毫秒執行一次 */);
    }


    /**

     * 取消View闪烁效果

     *

     * */

    private void stopFlick( View view ){

        /*if( null == view ){

            return;

        }
        if(!isFlicking ){

            return;

        }

        //view.clearAnimation( );
        if(mTimer==null)return;
        mTimer.cancel();
        mCBackground.setVisibility(View.VISIBLE);
        isFlicking=false;
        */

    }

	//Add by Alex新算法

	void playSound1() {
		if(soundable==false)return;
		MediaPlayer player = MediaPlayer.create(this, R.raw.song1);

		try {
			player.start();
		} catch (Exception e) {

		}
	}


	void playSound2() {

if(soundable==false)return;
		try {
			if (!myplayer2.isPlaying() && !tempMute2 && !myplayer3.isPlaying())

				myplayer2.start();
			neverplayed2 = false;
		} catch (Exception e) {

		}
	}

	void playSound3() {
		if(soundable==false)return;

		try {
			if (!myplayer3.isPlaying() && !tempMute3 && !myplayer2.isPlaying())

				myplayer3.start();
			neverplayed3 = false;
		} catch (Exception e) {

		}
	}

	void StopPlaying(int id) {
		if ((id == 2 || id == 0) & !neverplayed2) {
			myplayer2.pause();
			myplayer2.seekTo(0);
			tempMute2 = true;
		}

		if ((id == 3 || id == 0) & !neverplayed3) {
			myplayer3.pause();
			myplayer3.seekTo(0);

		}
		if (id == 0) {
			tempMute3 = true;
		}
	}


	@Override
	public boolean onCreateOptionsMenu(Menu menu) {
//		getMenuInflater().inflate(R.menu.set_menu, menu);

		return super.onCreateOptionsMenu(menu);
	}

	void setBleState(Boolean isConnected) {
		mIsConnected = isConnected;
		runOnUiThread(new Runnable() {
			public void run() {
				if (mIsConnected)
					mBleTips.setText("Connected");
				else
					mBleTips.setText("Disconnected");
			}
		});
	}

	void showInfo(final String msg) {
		runOnUiThread(new Runnable() {
			public void run() {
				Toast.makeText(context, msg, Toast.LENGTH_SHORT).show();
			}
		});
	}

	void connectBle() {
		int i;
		for (i = 0; i < 5; i++) {
			//连接蓝牙设备
			if (mble.connectDevice(mDeviceAddress, bleCallBack)) {
				setBleState(true);
				break;
			}

			try {
				Thread.sleep(500, 0);//500ms
			} catch (Exception e) {

			}
		}
		if (i == 5) {
			showInfo("连接失败");
			mble.startLeScan();
			return;
		}

		try {
			Thread.sleep(200, 0);//200ms
		} catch (Exception e) {

		}

		if (!mble.wakeUpBle()) {
			showInfo("连接失败");
			mble.startLeScan();
		}
	}

	Runnable capLeft = new Runnable() {
		public void run() {
			//mLight.setCircleColor(Color.WHITE);
			mMainView.setVisibility(View.INVISIBLE);
			mMainView.setImageResource(R.drawable.empty);
			mTips.setText(getResources().getString(R.string.Open));
			resetAllWetnessData();
			currentConfirmTimes = 0;
			level = 0;
			tempMute2 = false;
			mTips.setText(getResources().getString(R.string.Clamped));
			mCValue.setText("---");
			mWetnessValue.setText("");//Wetness:
			mV0Bt.setText("");
			mV1Bt.setText("");
			textViewNoMove.setText("");
		}
	};

	Runnable capEnter = new Runnable() {
		public void run() {
			mTips.setText(getResources().getString(R.string.Clamped));
			mMainView.setVisibility(View.VISIBLE);
			mMainView.setImageResource(R.drawable.diaper0);
		}
	};

	Runnable capShowInfo = new Runnable() {
		public void run() {
			int v1, c, t1, t2;
			double v0;
			int sleepValue = 0;
			int tempratureValue=0;

			if(StaticValues.Version==2)
			{
				c = ((mData[2] & 0xFF) << 8) + (mData[1] & 0xFF);

				v0=( (200 + ( mData[3] & 0xFF )) );//
			}
			else {
				c = ((mData[4] & 0xFF) << 8) + (mData[3] & 0xFF);
				v0 =(((mData[2] & 0xFF) << 8) + (mData[1] & 0xFF)) / 1024 * 360;

			}

			//if (c>1000)return;//过滤无用数据

			if (mData[0] == 0x00) {
				mLight.setCircleColor(Color.WHITE);
				mTips.setText(getResources().getString(R.string.Open));

				resetAllWetnessData();
				mCValue.setText("---");
				mMainView.setVisibility(View.INVISIBLE);
				mWetnessValue.setText("");//Wetness:
				mV0Bt.setText("");
				mV1Bt.setText("");
				mMainView.setImageResource(R.drawable.empty);
				textViewNoMove.setText("");
				//mMainView.setVisibility(View.INVISIBLE);
				//mBleTips.setText("Disconnect");
				//Alex
				return;
			} else {
				mTips.setText(getResources().getString(R.string.Clamped));
				//mBleTips.setText("Connected");
				mBleTips.setText(String.valueOf(dataS++));
            }
			if(StaticValues.Version==2)
			{
				sleepValue = mData[5];
			}
			else {
				sleepValue = ((mData[6] & 0xFF) << 8) + (mData[5] & 0xFF);

			}


			//setCircleColor(c);
            int DataValue=0;
			//increase only
			if(c>StaticValues.MinWetnessDate){
				c=StaticValues.MinWetnessDate;
			}
			else
			{
				StaticValues.MinWetnessDate=c;
			}
            if(c!=0) {
                int tempV = 24000 / c;

                if(tempV < 50)
                {
                    //int D=24000/(20+30);
                   // int X=20*530*D/(530-D);
                    //int Y=X/530;
                    DataValue=(101760 / c - 192);
                }
                else{
                    DataValue=tempV- 30;
                }
                if (DataValue < 0) DataValue = 0;
                updateNewValue(DataValue);
            }
			mCValue.setText("" + DataValue);
			int tempcc=0;
			if(CCfactor==3)
			{

				int[] a= {50, 80, 120,160,200,240,280,320};//amount table
				int[] v= {525,480,413,348,310,275,238,213};//value table

				int[] K= new int[a.length-1];//slope
				for(int i=0;i<K.length;i++)
				{
					K[i]=1000*(a[i+1]-a[i])/(v[i]-v[i+1]);//K is a scaled 1000 times slope
				}
				if(c > v[0]) //c is the read value from the sensor. Amont is not detectable now
				{
					textViewCC.setText("0ml");
				}
				else if(c < v[v.length-1]) //amount over the max measurable value
				{
					textViewCC.setText(">" + a[a.length-1]+ "ml");
				}
				else {  //amount measurable
					for (int i = 1; i < K.length; i++) {
						if (c < v[i] && c > v[i+1]) {
							int tempV= a[i] + K[i] * ( v[i] - c ) / 1000;
							textViewCC.setText(tempV+ "ml");
							break;
						}
					}
				}


			}
			else if(CCfactor==2)
			{
				int[] a= { 50,100,150,200,250,300,350,400,450,500};//amount table Baishi
				int[] v= {510,439,362,298,242,210,192,177,160,150};//value table

				int[] K= new int[a.length-1];//slope
				for(int i=0;i<K.length;i++)
				{
					K[i]=1000*(a[i+1]-a[i])/(v[i]-v[i+1]);//K is a scaled 1000 times slope
				}
				if(c > v[0]) //c is the read value from the sensor. Amont is not detectable now
				{
					textViewCC.setText("0ml");
				}
				else if(c < v[v.length-1]) //amount over the max measurable value
				{
					textViewCC.setText(">" + a[a.length-1]+ "ml");
				}
				else {  //amount measurable
					for (int i = 1; i < K.length; i++) {
						if (c < v[i] && c > v[i+1]) {
							int tempV= a[i] + K[i] * ( v[i] - c ) / 1000;
							textViewCC.setText(tempV+ "ml");
							break;
						}
					}
				}

			}
			else if(CCfactor==1)
			{
				int[] a= { 10, 20, 30, 40, 50,100,150,200,300,400};//amount table Huai
				int[] v= {520,477,458,377,342,270,256,231,205,177};//value table

				int[] K= new int[a.length-1];//slope
				for(int i=0;i<K.length;i++)
				{
					K[i]=1000*(a[i+1]-a[i])/(v[i]-v[i+1]);//K is a scaled 1000 times slope
				}
				if(c > v[0]) //c is the read value from the sensor. Amont is not detectable now
				{
					textViewCC.setText("0ml");
				}
				else if(c < v[v.length-1]) //amount over the max measurable value
				{
					textViewCC.setText(">" + a[a.length-1]+ "ml");
				}
				else {  //amount measurable
					for (int i = 1; i < K.length; i++) {
						if (c < v[i] && c > v[i+1]) {
							int tempV= a[i] + K[i] * ( v[i] - c ) / 1000;
							textViewCC.setText(tempV+ "ml");
							break;
						}
					}
				}

			}





			mWetnessValue.setText(getResources().getString(R.string.Wetness)+":"+c);
//			mT1Bt.setText(""+t1*5);
//			mT2Bt.setText(""+t2*5);

			mV0Bt.setText(String.format("%.2f", v0 /100 ));
			if(StaticValues.Version==0)
			{
				if (sleepValue >= 0 && sleepValue <= 100) {
					mV1Bt.setText("Normal");
					//mMainView.setVisibility(View.INVISIBLE);
					StopPlaying(3);
					tempMute3 = false;
					upsidedowning = false;
				}
				if (sleepValue >= 0xFFE0 && sleepValue <= 0xFFFF) {
					mV1Bt.setText("Upside Down");
					mMainView.setVisibility(View.VISIBLE);
					mMainView.setImageResource(R.drawable.pashui);
					upsidedowning = true;
			//test
					if (!tempMute3) {
						playSound3();
					}
				}

				textViewTemprature.setVisibility(View.INVISIBLE);

			}
			else if(StaticValues.Version==1) {
				if(sleepValue==0&&mData[7]==0) //temp modified Alex
				{
					//skip and do nothing without G-sensor
				}
				else{
					if (sleepValue >= 0 && sleepValue <= 100) {
						mV1Bt.setText("↓↓↓");
						mMainView.setVisibility(View.VISIBLE);
						mMainView.setImageResource(R.drawable.pashui);
						upsidedowning = true;
						//test
						if (!tempMute3) {
							playSound3();
						}
					}
					if (sleepValue >= 0xFFE0 && sleepValue <= 0xFFFF) {
						mV1Bt.setText("Normal");
						//mMainView.setVisibility(View.INVISIBLE);
						StopPlaying(3);
						tempMute3 = false;
						upsidedowning = false;
					}

					tempratureValue=mData[7];
					float temprature =(float)( 23 + tempratureValue/2);
					textViewTemprature.setVisibility(View.VISIBLE);
					textViewTemprature.setText((String.format("%.1f",temprature)+" ℃"));
				}

			}
			else if(StaticValues.Version==2) {

				tempratureValue=mData[4]& 0xFF;
				float temprature=(float)tempratureValue/2;



//if(angleData[0]==0&&angleData[1]==0&&angleData[2]==0)
				byte posture=mData[5];
				if(tempratureValue == 23 && (byte)posture == 0x0) //temp modified Alex,if no G senor, skip
				{
					mV1Bt.setText("N/A");
					//skip and do nothing without G-sensor
				}
				else{
					String s="";
					String ss="X:0\nY:0\nZ:0";
					if(angleData[0]==0&&angleData[1]==0&&angleData[2]==0)
					{}
					else
					{
						//s=String.valueOf("  x:"+ (angleData[0])+",y:" +(angleData[1])+",z:" + (angleData[2]));
						ss = String.valueOf("X:"+ (angleData[0])+"\nY:" +(angleData[1])+"\nZ:" + (angleData[2]));
						TextView tx11=(TextView)findViewById(R.id.textView11);
						tx11.setText(ss);
					}

					if ((byte)(posture & 0x1)==1) {  //sleeping
						mV1Bt.setText("↓↓↓"+s);
					} else if ((byte)(posture>>1 & 0x1)==1) {
						mV1Bt.setText("→→"+s);
					}
					else if ((byte)(posture>>2 & 0x1)==1) {
						mV1Bt.setText("↑↑↑"+s);
					}
					else if ((byte)(posture>>3 & 0x1)==1) {
						mV1Bt.setText("←←"+s);
					}
					else if ((byte)(posture>>4 & 0x1)==1) {
						mV1Bt.setText("| | |"+s);
					}
					else if ((byte)(posture>>5 & 0x1)==1) {
						mV1Bt.setText("! ! !"+s);
					}
					else
					{
						mV1Bt.setText("N/A"+s);
					}

					if ((byte)(posture>>7 & 0x1)==1) {   //fall
						mMainView.setVisibility(View.VISIBLE);
						mMainView.setImageResource(R.drawable.fall);
						upsidedowning = true;
						//test
						if (!tempMute3) {
							//playSound3();
						}
					}
					else {
						StopPlaying(3);
						//mMainView.setImageResource(R.drawable.empty);
						tempMute3 = false;
						upsidedowning = false;
						//mV1Bt.setText(" ");
					}

					int move=(mData[6] & 0xFF);
					int time=move*1;
					//if(move!=0) {  //no move
						textViewNoMove.setText(getResources().getString(R.string.Inactive) + time + getResources().getString(R.string.sec));
						//mV1Bt.setText("Nomove:" + time + "mins");
						//mMainView.setVisibility(View.VISIBLE);
						//mMainView.setImageResource(R.drawable.alert);
						//upsidedowning = true;
						//test
						if (!tempMute3) {
							//playSound3();
						}
					//}
					//else {
						//StopPlaying(3);
						//mMainView.setImageResource(R.drawable.empty);
						//tempMute3 = false;
						//upsidedowning = false;
						//textViewNoMove.setText("");
						//mV1Bt.setText(" ");
					//}



					textViewTemprature.setVisibility(View.VISIBLE);
					textViewTemprature.setText((String.format("%.1f",temprature)+" ℃"));
				}

			}



		}
	};


	HolloBluetooth.OnHolloBluetoothCallBack bleCallBack = new HolloBluetooth.OnHolloBluetoothCallBack() {

		@Override
		public void OnHolloBluetoothState(int state) {
			if (state == HolloBluetooth.HOLLO_BLE_DISCONNECTED) {
				runOnUiThread(new Runnable() {
					public void run() {
						setBleState(false);
						playSound1();
						Toast.makeText(context, "蓝牙已断开", Toast.LENGTH_SHORT).show();
						mble.startLeScan();
					}
				});
			}
		}

		@Override
		public void OnReceiveData(byte[] recvData) {
			if (recvData.length < 4 || recvData[0] != 0x55 || (recvData[recvData.length - 1] & 0xFF) != 0xEE) {
				return;
			}

			switch (recvData[1]) {
				case 0x01:    //电容插入或拔出
					if (recvData.length != 5) {
						return;
					}

					//电容插入
					if (recvData[2] == 0x5A && (recvData[3] & 0xFF) == 0xA5) {
						runOnUiThread(capEnter);


					}
					//电容拔出
					else if ((recvData[2] & 0xFF) == 0xFF && (recvData[3] & 0xFF) == 0xFF) {
						runOnUiThread(capLeft);

					}
					break;

				case 0x02: //返回测量数据
					if (recvData.length != 13 || recvData[recvData.length - 2] != checkBit(recvData)) {
						return;
					}

					for (int i = 3; i < recvData.length - 2; i++) {
						mData[i - 3] = recvData[i];
					}

					runOnUiThread(capShowInfo);

					break;

				/*case 0x03: //up down
					if (recvData.length != 13 || recvData[recvData.length - 2] != checkBit(recvData)) {
						return;
					}

					final byte[] data = recvData;
					runOnUiThread(new Runnable() {
						@Override
						public void run() {

							int value = 0;

							value = ((data[10] & 0xFF) << 8) + (data[9] & 0xFF);

							if (value >= 0 && value <= 100) {
								mV1Bt.setText("Normal");

								StopPlaying(3);
								tempMute3 = false;
							}

							if (value >= 0xFFE0 && value <= 0xFFFF) {

								mV1Bt.setText("Upside Down");
								mMainView.setImageResource(R.drawable.pashui);
								if (!tempMute3) {
									playSound3();
								}
							}
						}
					});

					break;*/

				default:
					break;
			}
		}


	};

	byte checkBit(byte[] data) {
		if (data.length < 5) {
			return 0;
		}

		byte result = data[2];

		for (int i = 3; i < data.length - 2; i++) {
			result ^= data[i];
		}

		result += data[0];

		return result;
//		return 0;
	}

	void setCircleColor(int value) {
		//带等级锁定
		mMainView.setVisibility(View.VISIBLE);
		if (value > 0 && value <= V3 && level <= CONFIRMTIMES) {
			if (currentConfirmTimes >= 3) {
				if(!upsidedowning)mMainView.setImageResource(R.drawable.diaper0);
				level = 3;
				//playSound2();
				currentConfirmTimes = CONFIRMTIMES;
			} else {
				currentConfirmTimes++;
			}
		} else if (value > V3 && value <= V2 && level != 3/*&& level<=2*/) {
			mMainView.setImageResource(R.drawable.diaper0);
			level = 2;

			currentConfirmTimes = 0;
		} else if (value > V2 && value <= V1 && level != 3 /*&& level<=1*/) {
			mMainView.setImageResource(R.drawable.diaper0);
			level = 1;

			currentConfirmTimes = 0;
		} else if (value > V1 && level != 3 /*&& level<=0*/) {
			mMainView.setImageResource(R.drawable.diaper0);
			level = 0;

			currentConfirmTimes = 0;

		}

	}

	@Override
	public boolean onOptionsItemSelected(MenuItem item) {
		switch (item.getItemId()) {
			case android.R.id.home:
				onBackPressed();
				return true;

			default:
				break;
		}
		return super.onOptionsItemSelected(item);
	}

	@Override
	protected void onDestroy() {
		super.onDestroy();

		mble.setScanCallBack(null);
		scanLeDevice(false);
        StopPlaying(0);
//		mTimeOutHandler.removeCallbacks(mThreadTimeOut);
//		mble.disconnectDevice();
//		Log.d(TAG, "destroy");
//		mble.disconnectLocalDevice();
//		Log.d(TAG, "销毁");
        super.onDestroy();

        //System.exit(0);
        //或者下面这种方式

        android.os.Process.killProcess(android.os.Process.myPid());

	}

	@Override
	public void onStart() {
		super.onStart();

		// ATTENTION: This was auto-generated to implement the App Indexing API.
		// See https://g.co/AppIndexing/AndroidStudio for more information.
		client.connect();
		Action viewAction = Action.newAction(
				Action.TYPE_VIEW, // TODO: choose an action type.
				"ShowInfo Page", // TODO: Define a title for the content shown.
				// TODO: If you have web page content that matches this app activity's content,
				// make sure this auto-generated web page URL is correct.
				// Otherwise, set the URL to null.
				Uri.parse("http://host/path"),
				// TODO: Make sure this auto-generated app deep link URI is correct.
				Uri.parse("android-app://com.example.Capacitor/http/host/path")
		);
		AppIndex.AppIndexApi.start(client, viewAction);
	}

	@Override
	public void onStop() {
		super.onStop();

		// ATTENTION: This was auto-generated to implement the App Indexing API.
		// See https://g.co/AppIndexing/AndroidStudio for more information.
		Action viewAction = Action.newAction(
				Action.TYPE_VIEW, // TODO: choose an action type.
				"ShowInfo Page", // TODO: Define a title for the content shown.
				// TODO: If you have web page content that matches this app activity's content,
				// make sure this auto-generated web page URL is correct.
				// Otherwise, set the URL to null.
				Uri.parse("http://host/path"),
				// TODO: Make sure this auto-generated app deep link URI is correct.
				Uri.parse("android-app://com.example.Capacitor/http/host/path")
		);
		AppIndex.AppIndexApi.end(client, viewAction);
		client.disconnect();
	}
}

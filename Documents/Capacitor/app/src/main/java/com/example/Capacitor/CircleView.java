package com.example.Capacitor;

/**
 * Created by wuruizhi on 11/7/15.
 */

import android.content.Context;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.Paint;
import android.util.AttributeSet;
import android.view.View;

public class CircleView extends View {

    private final  Paint paint;
    private final Context context;

    private int mBorderWidth;
    private int mBorderColor;
    private int mCircleColor;

    public CircleView(Context context) {

        // TODO Auto-generated constructor stub
        this(context, null);
    }

    public CircleView(Context context, AttributeSet attrs) {
        super(context, attrs);
        // TODO Auto-generated constructor stub
        this.context = context;
        this.paint = new Paint();
        this.paint.setAntiAlias(true); //消除锯齿
        this.paint.setStyle(Paint.Style.STROKE); //绘制空心圆
        mBorderWidth = 0;
        mBorderColor = Color.BLACK;
        mCircleColor = Color.RED;

    }

    //获取边框颜色
    public int getBorderColor() {
        return mBorderColor;
    }

    //设置边框颜色
    public void setBorderColor(int borderColor) {
        mBorderColor = borderColor;
        invalidate();
    }

    //设置边框宽度
    public void setBorderWidth(int borderWidth) {
        mBorderWidth = borderWidth;
        invalidate();
    }

    //获取圆圈颜色
    public int getCircleColor() {
        return mCircleColor;
    }

    //设置边框颜色
    public void setCircleColor(int circleColor) {
        mCircleColor = circleColor;
        invalidate();
    }

    @Override
    protected void onDraw(Canvas canvas) {
        // TODO Auto-generated method stub
        int center = getWidth()/2;
        int viewWidth = getWidth(); //px2dip(context,getWidth());
        int circleWidth;


//        //绘制圆环
        if (mBorderWidth > 0) {

            //半径为宽的一半减去笔粗的一半
            circleWidth = (viewWidth - mBorderWidth)/2;

            this.paint.setColor(mBorderColor);
            this.paint.setStrokeWidth(mBorderWidth);
            canvas.drawCircle(center,center, circleWidth, this.paint);
        }
        else {
            mBorderWidth = 0;
        }

        //绘制圆
        this.paint.setColor(mCircleColor);
        this.paint.setStrokeWidth(viewWidth/2 - mBorderWidth);
        //半径为宽的一半减去笔粗的一半
        circleWidth = (viewWidth - viewWidth/2 - mBorderWidth)/2;
        canvas.drawCircle(center, center, circleWidth, this.paint);


        super.onDraw(canvas);
    }

    /**
     * 根据手机的分辨率从 dp 的单位 转成为 px(像素)
     */
    public static int dip2px(Context context, float dpValue) {
        final float scale = context.getResources().getDisplayMetrics().density;
        return (int) (dpValue * scale + 0.5f);
    }

    /**
     * 根据手机的分辨率从 px(像素) 的单位 转成为 dp
     */
    public static int px2dip(Context context, float pxValue) {
        final float scale = context.getResources().getDisplayMetrics().density;
        return (int) (pxValue / scale + 0.5f);
    }

}


import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, Image, ImageBackground, Keyboard, Pressable, ScrollView, Text, TextInput, View, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { register } from '../../redux/slices/client/authSlice';

const initialFieldErrors = { name: '', username: '', phone: '', email: '', password: '', confirmPassword: '' };

const Field = ({ label, error, children, className = '' }) => (
  <View className={`mb-4 ${className}`}>
    <Text className='text-left text-white/80 mb-2 text-base'>{label}</Text>
    <View className={`flex-row items-center rounded-2xl border bg-zinc-900/80 px-3 py-3 ${error ? 'border-red-500/70' : 'border-white/10'}`}>{children}</View>
    {error ? <Text className='text-red-400 text-xs mt-1 text-right'>{error}</Text> : null}
  </View>
);

const ClientSignUp = ({ navigation }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [fieldErrors, setFieldErrors] = useState(initialFieldErrors);
  const [generalError, setGeneralError] = useState('');

  const clearFieldError = field => {
    if (fieldErrors[field]) setFieldErrors(prev => ({ ...prev, [field]: '' }));
    if (generalError) setGeneralError('');
  };

  const validateLocally = (cleanedPhone) => {
    const errors = { ...initialFieldErrors };
    if (!name.trim()) errors.name = 'الاسم مطلوب';
    if (!username.trim()) errors.username = 'اسم المستخدم مطلوب';
    
    if (!phone.trim()) {
      errors.phone = 'رقم الهاتف مطلوب';
    } else {
      const egPhoneRegex = /^(10|11|12|15)\d{8}$/;
      if (!egPhoneRegex.test(cleanedPhone)) {
        errors.phone = 'أدخل رقم هاتف مصري صحيح';
      }
    }
    
    if (!password) errors.password = 'كلمة المرور مطلوبة';
    if (!confirmPassword) errors.confirmPassword = 'تأكيد كلمة المرور مطلوب';
    if (password && confirmPassword && password !== confirmPassword) errors.confirmPassword = 'كلمتا السر مش متطابقتين';

    setFieldErrors(errors);
    return Object.values(errors).every(e => e === '');
  };

  const handleRegister = async () => {
    setGeneralError('');
    
    let cleanedPhone = phone.trim();
    if (cleanedPhone.startsWith('0')) {
      cleanedPhone = cleanedPhone.substring(1);
    }

    if (!validateLocally(cleanedPhone)) return;

    setLoading(true);
    try {
      await dispatch(
        register({
          name,
          username,
          phone: `+20${cleanedPhone}`,
          email: email || undefined,
          password,
        }),
      ).unwrap();
    } catch (err) {
      if (err?.field && err.field in initialFieldErrors) {
        setFieldErrors(prev => ({ ...prev, [err.field]: err.message }));
      } else {
        setGeneralError(err?.message || 'حصل خطأ، حاول تاني');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className='flex-1 bg-black'>
      <StatusBar style='light' />

      <ImageBackground source={require('../../../assets/images/loginBg5.png')} resizeMode='cover' className='flex-1'>
        <KeyboardAvoidingView behavior='padding' className='flex-1'>
          <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', paddingHorizontal: 24, paddingVertical: 32 }} keyboardShouldPersistTaps='handled'>
            <Pressable className='flex-1' onPress={Keyboard.dismiss}>
              <View className='w-full max-w-md self-center items-center'>
                <Image source={require('../../../assets/images/Logo.png')} resizeMode='contain' className='h-24 w-52 mb-6' />

                <View className='w-full bg-black/40 px-4 py-6 rounded-2xl shadow-2xl border border-white/5'>
                  <Text className='text-center text-gray-200 text-2xl font-bold mb-6'>إنشاء حساب جديد</Text>

                  {generalError ? (
                    <View className='mb-4 rounded-xl border border-red-500/40 bg-red-500/10 px-3 py-2'>
                      <Text className='text-center text-red-400 text-sm'>{generalError}</Text>
                    </View>
                  ) : null}

                  <Field label='الاسم بالكامل' error={fieldErrors.name}>
                    <Ionicons name='person-outline' size={18} color='rgba(255,255,255,0.7)' />
                    <TextInput
                      placeholder='اسمك بالكامل'
                      placeholderTextColor='rgba(255,255,255,0.38)'
                      textAlign='right'
                      value={name}
                      onChangeText={t => {
                        setName(t);
                        clearFieldError('name');
                      }}
                      className='outline-none flex-1 text-white text-base mx-3'
                    />
                  </Field>

                  <Field label='اسم المستخدم' error={fieldErrors.username}>
                    <Ionicons name='at-outline' size={18} color='rgba(255,255,255,0.7)' />
                    <TextInput
                      placeholder='اسم المستخدم'
                      placeholderTextColor='rgba(255,255,255,0.38)'
                      autoCapitalize='none'
                      textAlign='right'
                      value={username}
                      onChangeText={t => {
                        setUsername(t);
                        clearFieldError('username');
                      }}
                      className='outline-none flex-1 text-white text-base mx-3'
                    />
                  </Field>

                  <Field label='رقم الهاتف' error={fieldErrors.phone}>
                    <View className='flex-row items-center gap-2 border-r border-white/10 pr-3 mr-3'>
                      <Text style={{ writingDirection: 'ltr' }} className='text-white text-base'>
                        +20
                      </Text>
                    </View>
                    <Ionicons name='call-outline' size={18} color='#67e8f9' />
                    <TextInput
                      placeholder='ادخل رقم الهاتف'
                      placeholderTextColor='rgba(255,255,255,0.38)'
                      keyboardType='phone-pad'
                      textAlign='right'
                      value={phone}
                      onChangeText={t => {
                        setPhone(t);
                        clearFieldError('phone');
                      }}
                      className='outline-none flex-1 text-white text-base mr-3'
                    />
                  </Field>

                  <Field
                    label={
                      <>
                        البريد الإلكتروني <Text className='text-white/40 text-xs'>(اختياري)</Text>
                      </>
                    }
                    error={fieldErrors.email}>
                    <Ionicons name='mail-outline' size={18} color='rgba(255,255,255,0.7)' />
                    <TextInput
                      placeholder='example@email.com'
                      placeholderTextColor='rgba(255,255,255,0.38)'
                      keyboardType='email-address'
                      autoCapitalize='none'
                      textAlign='right'
                      value={email}
                      onChangeText={t => {
                        setEmail(t);
                        clearFieldError('email');
                      }}
                      className='outline-none flex-1 text-white text-base mx-3'
                    />
                  </Field>

                  <Field label='كلمة المرور' error={fieldErrors.password}>
                    <Ionicons name='lock-closed-outline' size={18} color='rgba(255,255,255,0.7)' />
                    <TextInput
                      placeholder='••••••••'
                      placeholderTextColor='rgba(255,255,255,0.38)'
                      secureTextEntry
                      textAlign='right'
                      value={password}
                      onChangeText={t => {
                        setPassword(t);
                        clearFieldError('password');
                        clearFieldError('confirmPassword');
                      }}
                      className='outline-none flex-1 text-white text-base mx-3'
                    />
                  </Field>

                  <Field label='تأكيد كلمة المرور' error={fieldErrors.confirmPassword} className='mb-0'>
                    <Ionicons name='lock-closed-outline' size={18} color='rgba(255,255,255,0.7)' />
                    <TextInput
                      placeholder='••••••••'
                      placeholderTextColor='rgba(255,255,255,0.38)'
                      secureTextEntry
                      textAlign='right'
                      value={confirmPassword}
                      onChangeText={t => {
                        setConfirmPassword(t);
                        clearFieldError('confirmPassword');
                      }}
                      className='outline-none flex-1 text-white text-base mx-3'
                    />
                  </Field>

                  <Pressable
                    onPress={handleRegister}
                    disabled={loading}
                    className='relative mt-6 overflow-hidden rounded-2xl bg-lime-400 py-4'
                    style={{
                      opacity: loading ? 0.7 : 1,
                      shadowColor: '#A3E635',
                      shadowOpacity: 0.9,
                      shadowRadius: 20,
                      shadowOffset: { width: 0, height: 0 },
                      elevation: 12,
                    }}>
                    {loading ? <ActivityIndicator color='#000' /> : <Text className='text-center text-zinc-950 text-lg font-bold'>إنشاء حساب</Text>}
                  </Pressable>
                </View>

                <View className='mt-6 flex-row items-center justify-center gap-2'>
                  <Text className='text-white/80'>عندك حساب بالفعل؟</Text>
                  <Pressable onPress={() => navigation.navigate('Login')}>
                    <Text className='text-white font-bold underline'>سجل دخولك</Text>
                  </Pressable>
                </View>
              </View>
            </Pressable>
          </ScrollView>
        </KeyboardAvoidingView>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default ClientSignUp;
